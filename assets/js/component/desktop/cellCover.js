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
            <span>{{desc}}</span>
        </div>
    `,
    setup(props){
        const {ref, toRefs} = Vue


        // variables
        const {title, desc} = toRefs(props)

        console.log(title, desc)


        // class
        const wrapperClass = 'w-full h-full p-12 absolute flex flex-col bg-[rgba(0,0,0,0.75)] justify-center items-center text-white text-center text-xl'
        

        // style
        const wrapperStyle = ref({
            fontFamily: 'NotoSansKRRegular',
        })


        return{
            wrapperClass,
            wrapperStyle,
            title,
            desc
        }
    }
}