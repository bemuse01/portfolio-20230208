export default {
    template: `
        <div :style="columnStyle">
            <slot />
        </div>
    `,
    setup(props){
        const {ref, onMounted} = Vue


        // variable
        const time = ~~(Math.random() * 300 + 300)


        // style
        const columnStyle = ref({
            opacity: '0',
            transform: 'translate(0, -2rem)',
            transition: '0.6s',
        })


        // method
        const showColumn = () => {
            columnStyle.value.transform = 'translate(0, 0)'
            columnStyle.value.opacity = '1'
        }


        // hook
        onMounted(() => {
            setTimeout(showColumn, time)
        })


        return{
            columnStyle
        }
    }
}