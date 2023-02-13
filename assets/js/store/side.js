export default {
    namespaced: true,
    state: {
        isRendered: false,
    },
    getters: {
        getIsRendered: (state) => state.isRendered,
    },
    mutations: {
        setIsRendered(state, rendered){
            state.isRendered = rendered
        },
    },
    actions: {
        setIsRendered({commit}, rendered){
            commit('setIsRendered', rendered)
        },
    },
}