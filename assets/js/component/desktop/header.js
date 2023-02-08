export default {
    template: `
        <div
            :class="headerClass"
        >
            <h5>Bemuse</h5>
        </div>
    `,
    setup(){

        // class
        const headerClass = 'ui-header w-full py-2'

        return{
            headerClass
        }
    }
}