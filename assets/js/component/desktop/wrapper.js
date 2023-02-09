import Data from '../../data/data.js'

import Header from './header.js'
import Tag from './tag.js'
import ColumnContainer from './columnContainer.js'
import Content from './content.js'

export default {
    components: {
        'ui-header': Header,
        'ui-content': Content,
        'ui-tag': Tag,
        'column-container': ColumnContainer
    },
    template: `
        <div
            id="ui-wrapper"
            :class="wrapperClass"
            :style="wrapperStyle"
        >
            <ui-header />
            <ui-content>
                <ui-tag />
                <column-container :data="data" />
            </ui-content>

        </div>
    `,
    setup(){
        const {ref, onMounted} = Vue


        // variable
        const data = ref(Array.from(Data.repo))


        // class
        const wrapperClass = 'w-[50%] mx-auto'


        // style
        const wrapperStyle = ref({
        })


        // mounted
        onMounted(() => {

        })


        return{
            wrapperStyle,
            wrapperClass,
            data
        }
    }
}