import {imgPath} from '../../config.js'

export default {
    template: `
        <div
            :class="cancelClass"
        >

            <button :class="buttonClass" @click="onButtonClick">
                <img :src="buttonSrc" />
            </button>

        </div>
    `,
    setup(){
        const {useStore} = Vuex


        // store
        const store = useStore()


        // variable
        const buttonSrc = imgPath + 'cancel.png'


        // class
        const cancelClass = 'w-full h-[40px] flex flex-row-reverse'
        const buttonClass = 'h-full aspect-square'


        // method
        const closeSidePannel = () => {
            store.dispatch('side/setIsRendered', false)
        }
        const onButtonClick = () => {
            closeSidePannel()
        }


        return{
            cancelClass,
            buttonClass,
            buttonSrc,
            onButtonClick
        }
    }
}