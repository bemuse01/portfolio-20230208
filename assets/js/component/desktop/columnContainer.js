export default {
    props: {
        data: Array,
        gap: Number
    },
    template: `
        <div
            :class="containerClass"
            :style="containerStyle"
        >

            <div
                v-for="item in items"
                :key="item.key"
                :class="item.className.column"
            >
                <img
                    :src="item.src"
                    :class="item.className.img"
                />
            </div>

        </div>       
    `,
    setup(props){
        const {ref, toRefs, computed} = Vue


        // variable
        const {data} = toRefs(props)
        const items = ref(Array.from(data.value, (item, idx) => ({
            key: idx,
            src: './assets/src/img/thumb/' + item.thumbPath,
            className: {
                column: (idx === 0 ? '' : 'mt-2') + ' rounded-lg overflow-hidden',
                img: 'w-full aspect-auto'
            }
        })))


        // class
        const containerClass = 'columns-4 mx-auto gap-2'


        // style
        const containerStyle = ref({
        })


        return{
            containerClass,
            containerStyle,
            items
        }
    }
}