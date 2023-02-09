import App from '../../class/app/app.js'
import Chaser from '../../class/chaser/chaser.js'

export default {
    template: `
        <div
            id="canvas-wrapper"
            :style="wrapperStyle"
        >

            <canvas 
                :style="canvasStyle" 
                :ref="el => canvas = el"
            />

        </div>
    `,
    setup(){
        const {ref, onMounted} = Vue


        // variable
        const canvas = ref()
        let app = null
        let chaser = null


        // style
        const wrapperStyle = ref({
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none'
        })
        const canvasStyle = ref({
            width: '100%',
            height: '100%'
        })


        // event
        const onMousemove = (e) => {
            // chaser.onMousemove(e)
        }


        // hook
        onMounted(() => {
            app = new App(canvas.value)
            // chaser = new Chaser({app})

            document.addEventListener('mousemove', onMousemove)
        })


        return{
            canvas,
            wrapperStyle,
            canvasStyle
        }
    }
}