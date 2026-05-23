export default {
  doubleCount(state) {
    return state.count * 2
  },
  messageUpper(state) {
    return state.message.toUpperCase()
  }
}
