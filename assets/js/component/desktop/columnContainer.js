import {thumbPath} from '../../data/config.js'

export default {
    props: {
        data: Array,
        gap: Number
    },
    template: `
        <div
            :class="containerClass"
            :style="containerStyle"
        >

            <div
                v-for="(item, idx) in items"
                :key="item.key"
                :class="item.className.column + headColumnClass(idx)"
            >
                <img
                    :src="item.src"
                    :class="item.className.img"
                />
            </div>

        </div>       
    `,
    setup(props){
        const {ref, toRefs, computed, watch} = Vue
        const {useStore} = Vuex


        // store
        const store = useStore()
        const getCheckedTag = computed(() => store.getters['content/getCheckedTag'])


        // method
        const createItems = () => {
            return Array.from(data.value, (item, idx) => ({
                key: idx,
                type: item.type,
                src: thumbPath + item.thumbPath,
                className: {
                    column: 'rounded-lg overflow-hidden',
                    img: 'w-full aspect-auto'
                }
            }))
        }


        // variable
        const headColumnClass = computed(() => (key) => key === 0 ? '' : ' mt-2')
        const {data} = toRefs(props) 
        const items = computed(() => {
            return getCheckedTag.value === 'all' ? 
            createItems() : 
            createItems().filter(item => item.type === getCheckedTag.value)
        })


        // class
        const containerClass = 'columns-4 mx-auto gap-2'


        // style
        const containerStyle = ref({
        })


        // watch
        // watch(getCheckedTag, (cur, pre) => {
        //     console.log(cur)
        // })


        return{
            containerClass,
            containerStyle,
            headColumnClass,
            items
        }
    }
}