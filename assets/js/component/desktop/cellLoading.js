export default {
    template: `
        <div :class="loadingClass">
        </div>
    `,
    setup(){
        // class
        const loadingClass = 'loading absolute w-full h-full bg-white'


        return{
            loadingClass
        }
    }
}