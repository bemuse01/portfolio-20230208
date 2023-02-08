import Wrapper from './wrapper.js'

export default {
    components: {
        'wrapper': Wrapper
    },
    template: `
        <div 
            class="desktop-layout"
            :style="layoutStyle"
        >

            <wrapper />

        </div>
    `,
    setup(){
        const {ref} = Vue


        // style
        const layoutStyle = ref({
            width: '100%',
            height: '100%'
        })


        return{
            layoutStyle,
        }
    }
}