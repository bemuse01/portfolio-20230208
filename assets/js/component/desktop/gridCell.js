import CellImage from './cellImage.js'
import CellCover from './cellCover.js'

const observerCallback = (entries, imgSrc, newSrc) => {
    entries.forEach(() => imgSrc.value = newSrc.value)
}

export default {
    components: {
        'cell-image': CellImage,
        'cell-cover': CellCover
    },
    props: {
        href: String,
        src: String,
        title: String,
        desc: String
    },
    template: `
        <div 
            :style="cellStyle" 
            :ref="el => cell = el"
            @mouseover="onMouseover"
            @mouseleave="onMouseleave"
        >

            <cell-image :href="href" :src="imgSrc"/>

            <transition name="fade-04s">
                <cell-cover :title="title" :desc="desc" v-show="showCover"/>
            </transition>

        </div>
    `,
    setup(props){
        const {ref, toRefs, onMounted, computed, watch} = Vue


        // props
        const {href, src, title, desc} = toRefs(props)

        // variable
        const cell = ref()
        const time = ~~(Math.random() * 300 + 300)
        const loaded = ref(false)
        const observer = new IntersectionObserver((entries) => observerCallback(entries, imgSrc, src))
        const imgSrc = ref('')
        const showCover = ref(false)


        // style
        const cellStyle = ref({
            opacity: '0',
            transform: 'translate(0, -2rem)',
            transition: '0.6s',
            display: 'flex',
            position: 'relative'
        })


        // method
        const onMouseover = () => {
            showCover.value = true
        }
        const onMouseleave = () => {
            showCover.value = false
        }
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
            imgSrc,
            title,
            desc,
            showCover,
            onMouseover,
            onMouseleave
        }
    }
}