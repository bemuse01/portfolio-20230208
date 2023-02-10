import SideTag from './sideTag.js'

export default {
    components: {
        'side-tag': SideTag
    },
    template: `
        <div 
            :class="contentClass"
        >

            <side-tag />

        </div>
    `,
    setup(){
        // class
        const contentClass = 'side-content flex-1 p-4'


        return{
            contentClass
        }
    }
}