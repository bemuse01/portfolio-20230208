import {sidePannelBgColor, sidePannelWidth} from '../../config.js'

import SideLink from './sideLink.js'
import SideTag from './sideTag.js'

export default {
    components: {
        'side-tag': SideTag,
        'side-link': SideLink
    },
    template: `
        <div 
            :class="bodyClass"
        >

            <side-link />
            <side-tag />

        </div>
    `,
    setup(){
        // class
        const bodyClass = `side-body absolute top-0 right-0 ${sidePannelBgColor} w-[${sidePannelWidth}] h-full flex-1 p-4`
        

        return{
            bodyClass,
        }
    }
}