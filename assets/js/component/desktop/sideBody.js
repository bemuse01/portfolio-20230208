import SideLink from './sideLink.js'
import SideTag from './sideTag.js'

export default {
    components: {
        'side-tag': SideTag,
        'side-link': SideLink
    },
    template: `
        <div 
            :class="contentClass"
        >

            <side-link />
            <side-tag />

        </div>
    `,
    setup(){
        // class
        const contentClass = 'side-body flex-1 p-4'


        return{
            contentClass
        }
    }
}