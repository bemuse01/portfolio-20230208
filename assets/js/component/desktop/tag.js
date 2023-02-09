import Data from '../../data/data.js'

import Method from '../../method/method.js'

export default {
    template: `
        <div
            :class="tagClass"
        >

            <label
                v-for="item in items"
                key="item.key"
                :class="item.className.label + checkLabelClass(item.key)"
            >
                
                {{upperLetter(item.value)}}
                
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
            id: Method.uuidv4(),
            className: {
                label: 'mx-1 p-2 rounded-[0.25rem] text-white hover:bg-gray-400 cursor-pointer'
            }
        })))
        const upperLetter = computed(() => (str) => str.split('').map((e, i) => i === 0 ? e.toUpperCase() : e).join(''))


        // class
        const tagClass = 'ui-tag w-[100%] py-4 sticky top-0 bg-[#eeeeeeee] z-50'
        const inputClass = 'hidden'


        // computed
        const checkLabelClass = computed(() => (key) => items.value[key].value === checked.value ? ' bg-gray-400' : ' bg-gray-300')


        // watch
        watch(checked, (cur, pre) => {
            store.dispatch('content/setCheckedTag', cur)
        })
        

        return{
            checked,
            items,
            tagClass,
            inputClass,
            checkLabelClass,
            upperLetter
        }
    }
}