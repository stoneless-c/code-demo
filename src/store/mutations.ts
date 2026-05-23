export default {
  INCREMENT(state) {
    state.count++
  },
  SET_MESSAGE(state, payload: string) {
    state.message = payload
  }
}
