export default {
    components: {
    },
    template: `
        <div 
            class="mobile-layout"
            :style="layoutStyle"
        >

        </div>
    `,
    setup(){
        const {ref, onMounted} = Vue


        // style
        const layoutStyle = ref({
            width: '100%',
            height: '100%'
        })


        // mounted
        onMounted(() => {

        })


        return{
            layoutStyle
        }
    }
}