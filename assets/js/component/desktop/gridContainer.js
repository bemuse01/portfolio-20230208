import {thumbPath, mainContentBgColor} from '../../data/config.js'
import Method from '../../method/method.js'

import Data from '../../data/data.js'
import Cell from './gridCell.js'

export default {
    components: {
        'cell': Cell
    },
    template: `
        <div
            :class="containerClass"
        >

            <cell
                v-for="(item, idx) in items"
                :key="item.key"
                :class="item.className.cell"
            >
                <img
                    :src="item.src"
                    :class="item.className.img"
                />
            </cell>

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
            return Array.from(data.value, item => ({
                key: Method.uuidv4(),
                type: item.type,
                src: thumbPath + item.thumbPath,
                className: {
                    cell: 'overflow-hidden aspect-square cursor-pointer',
                    img: 'w-full aspect-auto hover:scale-105 duration-200 object-center'
                }
            }))
        }


        // variable
        const data = ref(Data.repo)
        const items = computed(() => {
            return getCheckedTag.value === 'all' ? 
            createItems() : 
            createItems().filter(item => item.type === getCheckedTag.value)
        })


        // class
        const containerClass = `w-full grid grid-cols-4 ${mainContentBgColor} overflow-y-auto overflow-x-hidden`


        return{
            containerClass,
            items
        }
    }
}