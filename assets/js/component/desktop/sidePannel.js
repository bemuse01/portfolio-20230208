import {sidePannelBgColor, sidePannelWidth} from '../../config.js'

import SideHead from './sideHead.js'
import SideBody from './sideBody.js'

export default {
    components: {
        'side-head': SideHead,
        'side-body': SideBody  
    }, 
    template: `
        <div
            id="side-pannel"
            :class="sideClass"
        >
            
            <!--<side-head />-->
            <side-body />
        
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