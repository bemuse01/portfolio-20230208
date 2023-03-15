export default {
    props: {
        title: String,
        desc: String
    },
    template: `
        <div
            :class="wrapperClass"
            :style="wrapperStyle"
        >

            <span>{{title}}</span>

            <br />

            <span
                v-for="desc of descs"
                :key="desc.key"
            >
                {{desc.txt}}
            </span>

        </div>
    `,
    setup(props){
        const {ref, toRefs, computed} = Vue


        // variables
        const {title, desc} = toRefs(props)
        const descs = computed(() => desc.value.split('\n').map((txt, key) => ({
            key,
            txt
        })))


        // class
        const wrapperClass = 'w-full h-full p-14 absolute flex flex-col bg-[rgba(0,0,0,0.75)] justify-center items-center text-white text-center text-xl'
        

        // style
        const wrapperStyle = ref({
            fontFamily: 'NotoSansKRRegular',
        })


        return{
            wrapperClass,
            wrapperStyle,
            title,
            descs
        }
    }
}