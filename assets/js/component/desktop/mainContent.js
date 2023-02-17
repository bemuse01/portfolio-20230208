import {mainContentBgColor, sidePannelWidth} from '../../config.js'
import GridContainer from './gridContainer.js'

import Data from '../../data/data.js'

export default {
    components: {
        'grid-container' :GridContainer
    }, 
    template: `
        <div
            id="main-content"
            :class="mainClass"
        >

            <grid-container :repo="repo" />

        </div>
    `,
    setup(){
        const {} = Vue

        
        // class
        const {repo} = Data
        const mainClass = `absolute top-0 right-0 w-[calc(100%-${sidePannelWidth})] h-[auto]`

        console.log(repo)


        return{
            mainClass,
            repo
        }
    }
}