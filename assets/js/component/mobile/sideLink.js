import {mobileDefaultFontStyle, mainFontColor2, mainFontColor, titleFontColor} from '../../config.js'
import Data from '../../data/data.js'

export default {
    template: `
        <div
            :class="rootClass"
        >

            <div :class="titleClass">
                <span>LINK</span>
            </div>

            <div
                v-for="item in items"
                key="item.key"
                :class="linkClass"
            >
                
                <a 
                    :href="item.href" 
                    :target="item.target"
                    :class="textHoverClass"
                >
                    {{upperLetter(item.name)}}
                </a>
                
            </div>

        </div>
    `,
    setup(){
        const {ref, computed} = Vue


        // variable
        const {marks} = Data
        const items = ref(marks.map((mark, idx) => ({
            key: idx,
            name: mark.name,
            href: mark.url,
            target: mark.name === 'home' ? '' : '_blank'
        })))
        const upperLetter = computed(() => (str) => str.toUpperCase())


        // class
        const rootClass = `side-link w-[100%] py-3 ${titleFontColor}`
        const titleClass = `${mobileDefaultFontStyle}`
        const linkClass = `${mobileDefaultFontStyle} ${mainFontColor}`
        const textHoverClass = `hover:${mainFontColor2} cursor-pointer`


        return{
            items,
            rootClass,
            titleClass,
            linkClass,
            upperLetter,
            textHoverClass
        }
    }
}