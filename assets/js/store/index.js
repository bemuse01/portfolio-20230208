import ContentStore from './content.js'
import SideStore from './side.js'

export default Vuex.createStore({
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        content: ContentStore,
        side: SideStore
    }
})