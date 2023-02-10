import Data from '../../data/data.js'

import SidePannel from './sidePannel.js'
import MainContent from './mainContent.js'

export default {
    components: {
        'side-pannel': SidePannel,
        'main-content': MainContent
    },
    template: `
        <div
            id="wrapper"
            :class="wrapperClass"
            :style="wrapperStyle"
            :ref="el => wrapper = el"
        >

            <side-pannel />
            <main-content />

        </div>
    `,
    setup(){
        const {ref} = Vue


        // variable
        const data = ref(Array.from(Data.repo))
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
            data
        }
    }
}