export default {
    namespaced: true,
    state: {
        checkedTag: 'all',
    },
    getters: {
        getCheckedTag: (state) => state.checkedTag,
    },
    mutations: {
        setCheckedTag(state, checked){
            state.checkedTag = checked
        },
    },
    actions: {
        setCheckedTag({commit}, checked){
            commit('setCheckedTag', checked)
        },
    },
}