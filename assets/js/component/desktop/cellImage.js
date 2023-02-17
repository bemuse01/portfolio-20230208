export default {
    props: {
        href: String,
        src: String,
    },
    template: `
        <a
            :href="href"
            target="_blank"
        >
            <img
                :src="src"
                :class="imgClass"
            />
        </a>
    `,
    setup(props){
        const {toRefs} = Vue

        // props
        const {href, src} = toRefs(props)

        // class
        const imgClass = 'w-full aspect-auto hover:scale-105 duration-200 object-center'


        return{
            imgClass,
            href,
            src
        }
    }
}