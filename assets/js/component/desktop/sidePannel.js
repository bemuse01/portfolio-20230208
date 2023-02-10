import {sidePannelBgColor, sidePannelWidth} from '../../data/config.js'

import SideHead from './sideHead.js'
import SideContent from './sideContent.js'

export default {
    components: {
        'side-head': SideHead,
        'side-content': SideContent  
    }, 
    template: `
        <div
            id="side"
            :class="sideClass"
        >
            
            <!--<side-head />-->
            <side-content />
        
        </div>
    `,
    setup(){
        // class
        const sideClass = `w-[${sidePannelWidth}] h-full flex flex-col ${sidePannelBgColor} fixed top-0 left-0`


        return{
            sideClass
        }
    }
}