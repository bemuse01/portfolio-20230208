import MobileLayout from './mobile/mobileLayout.js'
import DesktopLayout from './desktop/desktopLayout.js'

export default {
    components: {
        'mobile-layout': MobileLayout,
        'desktop-layout': DesktopLayout,
    },
    template: `
        <div 
            id="app"
            :style="appStyle"
        >

            <desktop-layout v-if="currentDevice === 'desktop'" />
            <mobile-layout v-else />

        </div>
    `,
    setup(){
        const {ref, onMounted} = Vue


        // variable
        const currentDevice = ref('desktop')


        // style
        const appStyle = ref({
            width: '100%',
            height: '100%'
        })


        // method
        const checkDevice = () => {
            const {innerWidth} = window

            if(innerWidth >= 768){
                currentDevice.value = 'desktop'
            }else{
                currentDevice.value = 'mobile'
            }
        }
        const init = () => {
            checkDevice()
        }


        // event
        const onWindowResize = () => {
            checkDevice()
        }
        const initEvent = () => {
            window.addEventListener('resize', onWindowResize)
        }


        // hook
        onMounted(() => {
            init()
            initEvent()
        })


        return{
            currentDevice,
            appStyle
        }
    }
}