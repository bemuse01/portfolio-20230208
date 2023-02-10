export default {
    template: `
        <div
            :class="headClass"
        >
        </div>
    `,
    setup(){
        // class
        const headClass = 'side-head flex-[0.1]'


        return{
            headClass
        }
    }
}