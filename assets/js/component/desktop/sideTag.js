import {defaultFontStyle, mainFontColor2, mainFontColor, titleFontColor} from '../../data/config.js'
import Data from '../../data/data.js'

import Method from '../../method/method.js'

export default {
    template: `
        <div
            :class="rootClass"
        >

            <div :class="titleClass">
                <span>TAG</span>
            </div>

            <label
                v-for="item in items"
                key="item.key"
                :class="tagClass + checkedTagClass(item.key)"
            >
                
                <span>{{upperLetter(item.value)}}</span>
                
                <input 
                    type="radio"
                    :class="inputClass"
                    :value="item.value"
                    :name="item.name"
                    v-model="checked"
                />

            </label>

        </div>
    `,
    setup(){
        const {ref, watch, computed} = Vue
        const {useStore} = Vuex


        // store
        const store = useStore()
        // const getChecked = computed(() => store.getters['content/getCheckedTag'])


        // variable
        const checked = ref('all')
        const {tags} = Data
        const items = ref(tags.map((tag, idx) => ({
            key: idx,
            name: 'tag',
            value: tag,
            id: Method.uuidv4()
        })))
        const upperLetter = computed(() => (str) => str.toUpperCase())


        // class
        const rootClass = `side-tag w-[100%] p-0 ${titleFontColor}`
        const titleClass = `${defaultFontStyle}`
        const tagClass = `${defaultFontStyle} block cursor-pointer`
        const inputClass = 'hidden'


        // computed
        const checkedTagClass = computed(() => (key) => items.value[key].value === checked.value ? ` ${mainFontColor2}` : ` ${mainFontColor}`)


        // watch
        watch(checked, (cur, pre) => {
            store.dispatch('content/setCheckedTag', cur)
        })
        

        return{
            checked,
            items,
            rootClass,
            titleClass,
            tagClass,
            inputClass,
            checkedTagClass,
            upperLetter,
        }
    }
}