import {mainContentBgColor, headerHeight} from '../../config.js'
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
        const mainClass = `relative w-full h-auto`


        return{
            mainClass,
            repo
        }
    }
}