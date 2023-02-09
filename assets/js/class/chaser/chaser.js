import Method from '../../method/method.js'

import Particle from './build/particle.js'

export default class{
    constructor({app}){
        this.engine = app.engine

        this.scene = null
        this.camera = null
        this.cameraName = 'chaserCamaera'
        this.cameraPos = new BABYLON.Vector3(0, 0, -100)
        this.rw = this.engine.getRenderWidth()
        this.rh = this.engine.getRenderHeight()
        this.vw = null
        this.vh = null
        this.cx = 0
        this.cy = 0
        this.e = 0

        const color = BABYLON.Color3.FromHexString('#936cc6')

        this.params = [
            {
                module: Particle,
                color,
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


    // render
    render(){
        this.engine.runRenderLoop(() => {
            this.renderScene()
            this.animateComps()
        })
    }
    renderScene(){
        this.scene.render()
    }
    animateComps(){
        const {clientX, clientY} = this.e

        this.cx = clientX
        this.cy = clientY

        this.comps.forEach(comp => {
            if(comp.animate) comp.animate(this.cx, this.cy)
        })
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


    // event
    onMousemove(e){
        this.e = e
    }
}