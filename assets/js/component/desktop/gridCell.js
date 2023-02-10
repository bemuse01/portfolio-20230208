export default {
    template: `
        <div :style="cellStyle">
            <slot />
        </div>
    `,
    setup(props){
        const {ref, onMounted} = Vue


        // variable
        const time = ~~(Math.random() * 300 + 300)


        // style
        const cellStyle = ref({
            opacity: '0',
            transform: 'translate(0, -2rem)',
            transition: '0.6s',
        })


        // method
        const showColumn = () => {
            cellStyle.value.transform = 'translate(0, 0)'
            cellStyle.value.opacity = '1'
        }


        // hook
        onMounted(() => {
            setTimeout(showColumn, time)
        })


        return{
            cellStyle
        }
    }
}