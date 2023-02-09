import {thumbPath} from '../../data/config.js'
import Method from '../../method/method.js'

import Column from './column.js'

export default {
    components: {
        'column': Column
    },
    props: {
        data: Array,
        gap: Number
    },
    template: `
        <div
            :class="containerClass"
        >

            <column
                v-for="(item, idx) in items"
                :key="item.key"
                :class="item.className.column + headColumnClass(idx)"
            >
                <img
                    :src="item.src"
                    :class="item.className.img"
                />
            </column>

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
                key: Method.uuidv4(),
                type: item.type,
                src: thumbPath + item.thumbPath,
                className: {
                    column: 'rounded-md overflow-hidden',
                    img: 'w-full aspect-auto'
                }
            }))
        }


        // variable
        const headColumnClass = computed(() => (key) => key === 0 ? '' : ' mt-1')
        const {data} = toRefs(props) 
        const items = computed(() => {
            return getCheckedTag.value === 'all' ? 
            createItems() : 
            createItems().filter(item => item.type === getCheckedTag.value)
        })


        // class
        const containerClass = 'columns-4 mx-auto gap-1'
        // const animClass = 'columns-4 mx-auto gap-1'


        return{
            containerClass,
            // animClass,
            headColumnClass,
            items
        }
    }
}