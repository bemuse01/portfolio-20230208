import Method from '../../method/method.js'
import Spline from '../../lib/cubic-spline.js'

import Particle from './build/particle.js'

export default class{
    constructor({app, audio}){
        this.engine = app.engine
        this.audio = audio

        this.scene = null
        this.camera = null
        this.cameraName = 'visualizerCamaera'
        this.cameraPos = new BABYLON.Vector3(0, 0, -100)
        this.rw = this.engine.getRenderWidth()
        this.rh = this.engine.getRenderHeight()
        this.vw = null
        this.vh = null
        this.vlsSample = 100
        
        this.count = 120
        this.splineSmooth = 0.6
        this.spilneAvgBoost = 1.15
        this.xs = Array.from({length: this.count}, (_, i) => i * 1)
        this.audioData = null
        this.prevAudioData = Array.from({length: this.count}, _ => 0)
        this.audioOffset = ~~(this.audio.fftSize / 2 * 0.4)
        this.audioDataLen = this.audio.fftSize / 2 - this.audioOffset
        this.audioStep = ~~(this.audioDataLen / this.count)
        this.crtAudioRatio = 0.2
        this.prevAudioRatio = 1 - this.crtAudioRatio

        console.log(this.audioOffset)
        console.log(this.audioDataLen)
        console.log(this.audioStep)

        const radius = 25
        const color = BABYLON.Color3.FromHexString('#66faff')
        const audioBoost = 35

        this.params = [
            {
                module: Particle,
                count: this.count,
                radius,
                color,
                audioBoost
            }
        ]
        this.comps = []

        this.init()
    }


    // init
    init(){
        this.create()
        this.render()

        window.addEventListener('resize', () => this.resize(), false)
    }


    // create
    create(){
        this.createRenderObject()
        this.createPostProcess()
        this.createObject()
    }
    createRenderObject(){
        this.scene = new BABYLON.Scene(this.engine)
        // this.scene.autoClear = false
        this.scene.clearColor = new BABYLON.Color4(0, 0, 0, 0)

        this.camera = new BABYLON.FreeCamera(this.cameraName, this.cameraPos, this.scene)
        this.camera.setTarget(BABYLON.Vector3.Zero())
        
        this.aspect = this.engine.getAspectRatio(this.camera)
        this.vw = Method.getVisibleWidth(this.camera, this.aspect, 0)
        this.vh = Method.getVisibleHeight(this.camera, 0)

        this.rtt = new BABYLON.RenderTargetTexture('rtt', {width: this.rw, height: this.rh}, this.scene)
        this.rtt.samples = 8
        this.scene.customRenderTargets.push(this.rtt)
    }
    createObject(){
        for(const param of this.params){
            const instance = param.module

            this.comps.push(
                new instance({
                    scene: this.scene, 
                    engine: this.engine, 
                    audio: this.audio, 
                    camera: this.camera,
                    rtt: this.rtt,
                    ...param
                })
            )
        }
    }
    createPostProcess(){
        // this.createGlow()
        this.createVLS()
    }
    createGlow(){
        this.glow = new BABYLON.GlowLayer('glow', this.scene, 
            {
                // mainTextureRatio: 1,
                mainTextureSamples: 2,
                // mainTextureFixedSize: 512,
                // blurKernelSize: 64,
            }
        )
        // this.glow.intensity = 0.6
        // this.glow2 = new BABYLON.GlowLayer('glow2', this.scene, 
        //     {
        //         // mainTextureRatio: 1,
        //         mainTextureSamples: 8,
        //         mainTextureFixedSize: 1024,
        //         blurKernelSize: 16,
        //     }
        // )
        // this.glow2.intensity = 0.6
    }
    createVLS(){
        this.vls = new BABYLON.VolumetricLightScatteringPostProcess(
            'vls1', 
            1.0, 
            this.camera, 
            null,
            this.vlsSample, 
            BABYLON.Texture.BILINEAR_SAMPLINGMODE, 
            this.engine, 
            false
        )
        this.vls.mesh.material.diffuseTexture = this.rtt
        this.vls.mesh.material.diffuseTexture.hasAlpha = true
        // this.vls.mesh.material.alphaMode = BABYLON.Engine.ALPHA_ADD
        this.vls.mesh.position = new BABYLON.Vector3(0, 0, 0)
    	this.vls.mesh.scaling = new BABYLON.Vector3(this.vw, this.vh, 1)
        // console.log(this.vw, this.vh)
    }


    // render
    render(){
        this.engine.runRenderLoop(() => {
            // this.engine.clear(true, true, false)
            // this.engine.clear(new BABYLON.Color4(0, 0, 0, 0.1), true, false)
            
            this.renderScene()
            // this.updateAudioData()
            this.animateComps()
        })
    }
    renderScene(){
        this.scene.render()
    }
    animateComps(){
        const {audioData} = this.audio

        this.comps.forEach(comp => {
            if(comp.animate) comp.animate(audioData)
        })
    }
    updateAudioData(){
        const {audioData} = this.audio

        if(!audioData) return

        const stepData = this.createStepAudioData(audioData)
        this.audioData = this.createSplinedAudioData(stepData)
        this.createProcessedAudioData()
    }
    createStepAudioData(audioData){
        return Array.from({length: this.count}, (_, i) => audioData[~~(this.audioOffset / 2) + i * this.audioStep] / 255)
    }
    createSplinedAudioData(audioData){
        const len = audioData.length
        const ats = []

        const xs = this.xs
        const ys = audioData
        // ys[0] = 0

        const spline = new Spline(xs, ys)
        
        for(let i = 0; i < len; i++){
            ats.push(spline.at(i * this.splineSmooth))
        }
        
        // const hats = ats.slice(0, ats.length / 2)
        const avg = (ats.reduce((p, c) => p + c) / len) * this.spilneAvgBoost
        const temp = ats.map((e, i) => Math.max(0, e - avg))

        // const reverse = [...temp]
        // reverse.reverse()

        // return [...temp, ...reverse]
        return temp
    }
    createProcessedAudioData(){
        this.audioData = this.prevAudioData.map((e, i) => this.audioData[i] * this.crtAudioRatio + e * this.prevAudioRatio)
        this.prevAudioData = this.audioData
    }    


    // resize
    resize(){
        this.resizeViewports()
        this.resizeComps()
    }
    resizeViewports(){
        this.rw = this.engine.getRenderWidth()
        this.rh = this.engine.getRenderHeight()
        this.aspect = this.engine.getAspectRatio(this.camera)
        this.vw = Method.getVisibleWidth(this.camera, this.aspect, 0)
        this.vh = Method.getVisibleHeight(this.camera, 0)
    	this.vls.mesh.scaling = new BABYLON.Vector3(this.vw, this.vh, 1)
    }
    resizeComps(){
        this.comps.forEach(comp => {
            if(comp.resize) comp.resize()
        })
    }
}