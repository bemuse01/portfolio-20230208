import Wrapper from './wrapper.js'
// import CanvasWrapper from './canvasWrapper.js'


export default {
    components: {
        'wrapper': Wrapper,
        // 'canvas-wrapper': CanvasWrapper
    },
    template: `
        <div 
            class="mobile-layout"
            :style="layoutStyle"
        >

            <wrapper />

        </div>
    `,
    setup(){
        const {ref} = Vue


        // style
        const layoutStyle = ref({
            position: 'relative',
            width: '100%',
            height: '100%',
            // backgroundColor: '#eee'
        })


        return{
            layoutStyle,
        }
    }
}