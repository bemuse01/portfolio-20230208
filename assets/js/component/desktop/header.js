import {imgPath} from '../../data/config.js'
import Mark from '../../data/mark.js'

export default {
    template: `
        <div
            :class="headerClass"
        >
            <div
                class="header-section"
                :style="publicStyle"
            >
                <div
                    :class="markClass"
                >
                    <span>
                        <img
                            :src="markSrc"
                        />
                    </span>
                </div>
            </div>

            <div
                class="header-section"
                :style="{...publicStyle, ...linkStyle}"
            >
                <div
                    :class="markClass"
                    v-for="item in items"
                    :key="item.key"
                >
                    <span>
                        <img
                            :src="item.src"
                        />
                    </span>

                </div>

            </div>

        </div>
    `,
    setup(){
        const {ref} = Vue


        // variable
        const {mark, links} = Mark
        const markSrc = imgPath + mark
        const items = ref(links.map((link, idx) => ({
            key: idx,
            src: imgPath + link
        })))


        // class
        const headerClass = 'ui-header w-full py-5 text-2xl flex'
        const markClass = 'w-[32px] rounded-[50%] overflow-hidden'


        // style
        const publicStyle = ref({
            display: 'flex',
            flex: '1'
        })
        const linkStyle = ref({
            flexDirection: 'row-reverse',
            gap: '12px'
        })


        return{
            publicStyle,
            markSrc,
            markClass,
            headerClass,
            linkStyle,
            items
        }
    }
}