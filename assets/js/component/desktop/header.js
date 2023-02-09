import {imgPath} from '../../data/config.js'
import Data from '../../data/data.js'

export default {
    template: `
        <div
            :class="headerClass"
        >
            <div
                :class="sectionClass"
            >
                <div
                    :class="markClass"
                    v-for="item in items"
                    :key="item.key"
                >

                    <span>
                        <a :href="item.link" :target="item.target">
                            <img :src="item.src" />
                        </a>
                    </span>

                </div>

            </div>

        </div>
    `,
    setup(){
        const {ref} = Vue


        // variable
        const {marks} = Data
        const items = ref(marks.map((mark, idx) => ({
            key: idx,
            src: imgPath + mark.imgPath,
            link: mark.link,
            target: mark.name === 'home' ? '' : '_blank'
        })))


        // class
        const headerClass = 'ui-header w-full py-5 text-2xl flex'
        const sectionClass = 'header-section flex flex-1 justify-center gap-4'
        const markClass = 'w-[32px] rounded-[50%] overflow-hidden'


        return{
            markClass,
            sectionClass,
            headerClass,
            items
        }
    }
}