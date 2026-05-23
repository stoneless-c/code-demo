export default {
  increment({ commit }) {
    commit('INCREMENT')
  },
  setMessage({ commit }, payload: string) {
    commit('SET_MESSAGE', payload)
  }
}
