import CellImage from './cellImage.js'

const observerCallback = (entries, loaded) => {
    entries.forEach(() => loaded.value = true)
}

export default {
    components: {
        'cell-image': CellImage  
    },
    props: {
        href: String,
        src: String,
    },
    template: `
        <div :style="cellStyle" :ref="el => cell = el">

            <cell-image :href="href" :src="src"/>

        </div>
    `,
    setup(props){
        const {ref, toRefs, onMounted, computed, watch} = Vue


        // props
        const {href, src} = toRefs(props)


        // variable
        const cell = ref()
        const time = ~~(Math.random() * 300 + 300)
        const loaded = ref(false)
        const observer = new IntersectionObserver((entries) => observerCallback(entries, loaded))


        // style
        const cellStyle = ref({
            opacity: '0',
            transform: 'translate(0, -2rem)',
            transition: '0.6s',
            display: 'flex'
        })


        // method
        const addElementToObserver = () => {
            observer.observe(cell.value)
        }
        const showColumn = () => {
            cellStyle.value.transform = 'translate(0, 0)'
            cellStyle.value.opacity = '1'
        }
        const init = () => {
            addElementToObserver()
            setTimeout(showColumn, time)
        }


        // watch
        watch(loaded, (cur, pre) => {
            if(cur){
                console.log(cur)
            }
        })


        // hook
        onMounted(() => {
            init()
        })


        return{
            cell,
            cellStyle,
            href,
            src
        }
    }
}