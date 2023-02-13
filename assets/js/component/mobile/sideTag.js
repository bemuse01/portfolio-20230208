import {mobileDefaultFontStyle, mainFontColor2, mainFontColor, titleFontColor} from '../../config.js'
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

            <div
                v-for="item in items"
                key="item.key"
                :class="tagClass + checkedTagClass(item.key)"
            >
                
                <label 
                    :class="textHoverClass" 
                    :for="item.id"
                >{{upperLetter(item.value)}}</label>
                
                <input 
                    type="radio"
                    :id="item.id"
                    :class="inputClass"
                    :value="item.value"
                    :name="item.name"
                    v-model="checked"
                />

            </div>

        </div>
    `,
    setup(){
        const {ref, watch, computed} = Vue
        const {useStore} = Vuex


        // store
        const store = useStore()
        const getChecked = computed(() => store.getters['content/getCheckedTag'])


        // variable
        const checked = ref(getChecked.value)
        const {tags} = Data
        const items = ref(tags.map((tag, idx) => ({
            key: idx,
            name: 'tag',
            value: tag,
            id: Method.uuidv4()
        })))
        const upperLetter = computed(() => (str) => str.toUpperCase())


        // class
        const rootClass = `side-tag w-[100%] py-3 ${titleFontColor}`
        const titleClass = `${mobileDefaultFontStyle}`
        const tagClass = `${mobileDefaultFontStyle}`
        const inputClass = 'hidden'
        const textHoverClass = `cursor-pointer hover:${mainFontColor2}`


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
            textHoverClass
        }
    }
}