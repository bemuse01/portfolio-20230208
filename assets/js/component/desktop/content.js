export default {
    template: `
        <div
            :class="contentClass"
        >
            <slot />
        </div>
    `,
    setup(){
        // class
        const contentClass = 'ui-content w-full'

        return{
            contentClass
        }
    }
}