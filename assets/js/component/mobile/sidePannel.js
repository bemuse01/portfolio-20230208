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
            <div :class="sideBgClass" @click="onSideBgClick"></div>
            <side-body />
        
        </div>
    `,
    setup(){
        const {useStore} = Vuex


        // store
        const store = useStore()


        // class
        const sideClass = `w-full h-full flex flex-col fixed top-0 left-0 z-[99999]`
        const sideBgClass = 'side-bg bg-[rgba(50,50,50,0.75)] aboluste top-0 left-0 w-full h-full'


        // method
        const closeSidePannel = () => {
            store.dispatch('side/setIsRendered', false)
        }
        const onSideBgClick = () => {
            closeSidePannel()
        }


        return{
            sideClass,
            sideBgClass,
            onSideBgClick
        }
    }
}