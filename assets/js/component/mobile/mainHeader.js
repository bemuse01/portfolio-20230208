import {sidePannelBgColor, headerHeight} from '../../config.js'


export default {
    components: {
    }, 
    template: `
        <div
            id="main-header"
            :class="headerClass"
        >

            <button :class="buttonClass" @click="onButtonClick"></button>
            
        </div>
    `,
    setup(){
        const {computed} = Vue
        const {useStore} = Vuex


        // store
        const store = useStore()
        const sideIsRendered = computed(() => store.getters['side/getIsRendered'])


        // class
        const headerClass = `w-full h-[${headerHeight}] flex flex-row-reverse ${sidePannelBgColor} sticky top-0 z-[9999] p-3`
        const buttonClass = 'w-auto h-full aspect-square'


        // method
        const openSidePannel = () => {
            store.dispatch('side/setIsRendered', true)
        }
        const onButtonClick = () => {
            openSidePannel()
        }


        return{
            headerClass,
            buttonClass,
            onButtonClick
        }
    }
}