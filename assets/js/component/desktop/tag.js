import Data from '../../data/data.js'

export default {
    template: `
        <div
            :class="tagClass"
        >

            <span
                v-for="item in items"
                key="item.key"
                :class="item.className.span"
            >{{item.tagName}}
            </span>

        </div>
    `,
    setup(){
        const {computed} = Vue


        // variable
        const tags = ['all', ...Object.keys(Data)]
        const items = computed(() => tags.map((tag, idx) => ({
            key: idx,
            tagName: tag,
            className: {
                span: 'mx-1 bg-slate-400 p-2 rounded-xl text-white'
            }
        })))


        // class
        const tagClass = 'ui-tag w-[100%] py-4 sticky top-0 bg-[rgba(255,255,255,0.9)]'
        

        return{
            items,
            tagClass
        }
    }
}