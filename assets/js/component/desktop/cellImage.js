import CellLoading from './cellLoading.js'

export default {
    components: {
        'cell-loading': CellLoading
    },
    props: {
        href: String,
        src: String,
    },
    template: `
        <div
            :class="wrapperClass"
        >

            <a
                :href="href"
                target="_blank"
            >
                <img
                    :src="src"
                    :class="imgClass"
                    @load="onLoad"
                />
            </a>

            <transition name="fade">
                <cell-loading v-if="!loaded" />
            </transition>

        </div>
    `,
    setup(props){
        const {ref, toRefs} = Vue


        // props
        const {href, src} = toRefs(props)
        const loaded = ref(false)


        // class
        const wrapperClass = 'w-full h-full flex'
        const imgClass = 'w-full aspect-auto hover:scale-105 duration-200 object-center'


        // method
        const onLoad = () => {
            loaded.value = true
        }


        return{
            wrapperClass,
            imgClass,
            href,
            src,
            onLoad,
            loaded
        }
    }
}