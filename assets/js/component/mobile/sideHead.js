import {sideHeadHeight, titleFontColor} from '../../config.js'

export default {
    template: `
        <div
            :class="headClass"
        >
            <h1>Bemuse Portfolio</h1>
        </div>
    `,
    setup(){
        // class
        // const headClass = `side-head h-[${sideHeadHeight}] ${titleFontColor} p-2`
        const headClass = `side-head text-[1.5rem] ${titleFontColor} tracking-wide px-4 py-2.5 border-b-[1px] border-slate-700`


        return{
            headClass
        }
    }
}