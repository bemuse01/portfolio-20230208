import Data from '../../data/data.js'

import MainHeader from './mainHeader.js'
import MainContent from './mainContent.js'
import SidePannel from './sidePannel.js'

export default {
    components: {
        'main-header': MainHeader,
        'main-content': MainContent,
        'side-pannel': SidePannel,
    },
    template: `
        <div
            id="wrapper"
            :class="wrapperClass"
            :style="wrapperStyle"
            :ref="el => wrapper = el"
        >

            <main-header />
            <main-content />
            <side-pannel v-if="sideIsRendered"/>

        </div>
    `,
    setup(){
        const {ref, computed, watch} = Vue
        const {useStore} = Vuex


        // store
        const store = useStore()
        const sideIsRendered = computed(() => store.getters['side/getIsRendered'])


        // variable
        const wrapper = ref()


        // class
        const wrapperClass = 'w-full h-full'


        // style
        const wrapperStyle = ref({
        })


        return{
            wrapper,
            wrapperStyle,
            wrapperClass,
            sideIsRendered,
        }
    }
}