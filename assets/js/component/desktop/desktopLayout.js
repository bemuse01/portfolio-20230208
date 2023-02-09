import Wrapper from './wrapper.js'

export default {
    components: {
        'ui-wrapper': Wrapper,
    },
    template: `
        <div 
            class="desktop-layout"
            :style="layoutStyle"
        >

            <ui-wrapper class="ui-wrapper" />

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