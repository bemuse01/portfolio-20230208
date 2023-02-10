import {mainContentBgColor, sidePannelWidth} from '../../data/config.js'
import GridContainer from './gridContainer.js'

export default {
    components: {
        'grid-container' :GridContainer
    }, 
    template: `
        <div
            id="main-content"
            :class="mainClass"
        >

            <grid-container />

        </div>
    `,
    setup(){
        const {} = Vue

        
        // class
        const mainClass = `absolute top-0 right-0 w-[calc(100%-${sidePannelWidth})] h-[auto]`


        return{
            mainClass
        }
    }
}