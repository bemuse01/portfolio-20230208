import Method from '../../../method/method.js'

import {MathUtils} from '../../../lib/three.module.js'
import GetShaderName from '../shader/particle.shader.js'

export default class{
    constructor({
        scene,
        engine,
        camera,
        color
    }){
        this.scene = scene
        this.engine = engine
        this.camera = camera
        this.color = color

        this.rw = this.engine.getRenderWidth()
        this.rh = this.engine.getRenderHeight()
        this.aspect = this.engine.getAspectRatio(this.camera)
        this.vw = Method.getVisibleWidth(this.camera, this.aspect, 0)
        this.vh = Method.getVisibleHeight(this.camera, 0)

        this.count = 1000
        this.pointSize = 2
        // this.lifes = Array.from({length: this.count}, _ => 1)
        this.lifeVelocities = Array.from({length: this.count}, (_, i) => Math.random() * 0.01 + 0.01)
        this.velocities = Array.from({length: this.count}, _ => ({x: 0, y: 0}))
        this.accels = Array.from({length: this.count}, _ => ({x: MathUtils.randFloat(-0.001, 0.001), y: MathUtils.randFloat(0.005, 0.01)}))
        this.play = false
        this.points = null

        this.init()
    }


    // init
    init(){
        this.create()
    }


    // create
    create(){
        const {scene, engine, count} = this

        const material = this.createMaterial()

        const {positionBuffer, opacityBuffer} = this.createBuffer()

        this.points = new BABYLON.PointsCloudSystem('pcs', 1, scene)

        this.points.addPoints(count)

        this.points.buildMeshAsync().then(() => {
            this.points.initParticles()
            this.points.setParticles()
            this.points.mesh.material = material
            this.points.mesh.material.pointsCloud = true
            this.points.mesh.setVerticesBuffer(positionBuffer)
            this.points.mesh.setVerticesBuffer(opacityBuffer)
            this.play = true
        })

    }
    createBuffer(){
        const {engine, count} = this

        // const opacity = []
        // const position = []

        // for(let i = 0; i < count; i++){
        //     opacity.push(0)
        //     position.push(1)
        // }

        const opacityBuffer = new BABYLON.VertexBuffer(engine, new Float32Array(Array.from({length: count}, _ => 0)), 'opacity', true, false, 1, false)
        const positionBuffer = new BABYLON.VertexBuffer(engine, new Float32Array(Array.from({length: count * 3}, _ => 0)), 'aPosition', true, false, 3, false)

        return{
            opacityBuffer,
            positionBuffer
        }
    }
    createMaterial(){
        const shaderName = GetShaderName()

        const material = new BABYLON.ShaderMaterial('material', this.scene,
            {
                vertex: shaderName,
                fragment: shaderName
            },
            {
                attributes: ['position', 'normal', 'uv', 'opacity', 'aPosition'],
                uniforms: ['world', 'worldView', "worldViewProjection", 'view', 'projection', 'viewProjection', 'uColor', 'uPointSize'],
                needAlphaBlending: true,
                needAlphaTesting: true,
            }
        )

        material.setColor3('uColor', this.color)
        material.setFloat('uPointSize', this.pointSize)
        // material.alphaMode = BABYLON.Engine.ALPHA_ADD

        // const material = new BABYLON.StandardMaterial('material', this.scene)
        // material.emissiveColor = this.color
        // // material.alpha = 0.25
        // material.alphaMode = BABYLON.Engine.ALPHA_ADD

        return material
    }


    // resize
    resize(){
        this.rw = this.engine.getRenderWidth()
        this.rh = this.engine.getRenderHeight()
        this.aspect = this.engine.getAspectRatio(this.camera)
        this.vw = Method.getVisibleWidth(this.camera, this.aspect, 0)
        this.vh = Method.getVisibleHeight(this.camera, 0)
    }


    // animate
    animate(cx, cy){
        if(!this.play) return

        const rx = (cx / this.rw) - 0.5
        const ry = (cy / this.rh) - 0.5

        const x = rx * this.vw
        const y = ry * -this.vh

        const {lifeVelocities, velocities, accels, count} = this

        const opacity = this.points.mesh.getVerticesData('opacity')
        const position = this.points.mesh.getVerticesData('aPosition')

        for(let i = 0; i < count; i++){
            const idx = i * 3

            const particle = this.points.particles[i]
            const lifeVelocity = lifeVelocities[i]
            const accel = accels[i]


            // life
            opacity[i] += -lifeVelocity


            // velocity
            this.velocities[i].x += accel.x
            this.velocities[i].y += accel.y

            position[idx + 0] += this.velocities[i].x
            position[idx + 1] += -this.velocities[i].y
            
            if(opacity[i] < 0){
                opacity[i] = 1
                position[idx + 0] = x
                position[idx + 1] = y
                this.velocities[i].x = 0
                this.velocities[i].y = 0
            }
        }

        this.points.mesh.updateVerticesData('opacity', opacity)
        this.points.mesh.updateVerticesData('aPosition', position)
    }
}