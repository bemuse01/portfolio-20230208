// import ShaderMethod from '../../../method/method.shader.js'

const name = 'visualizerParticle'

const getShaderName = () => {
    const vertex = `
        attribute vec3 position;
        attribute vec2 uv;
        attribute float opacity;
        attribute vec3 aPosition;

        uniform mat4 worldViewProjection;
        uniform float uPointSize;

        varying vec2 vUv;
        varying float vOpacity;

        void main(){
            vec3 nPosition = position;

            nPosition += aPosition;

            gl_Position = worldViewProjection * vec4(nPosition, 1.0);
            gl_PointSize = uPointSize;

            vUv = uv;
            vOpacity = opacity;
        }
    `
    const fragment = `
        uniform vec3 uColor;    

        varying vec2 vUv;
        varying float vOpacity;

        void main(){
            gl_FragColor = vec4(uColor, vOpacity);
        }
    `
    
    BABYLON.Effect.ShadersStore[name + 'VertexShader'] = vertex
    BABYLON.Effect.ShadersStore[name + 'FragmentShader'] = fragment

    return name
}

export default getShaderName