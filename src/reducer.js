import charReducer from "charReducer"
export default function rootReducer(state = {}, action) {
  // always return a new object for the root state
  return {
    // the value of `state.todos` is whatever the todos reducer returns
    char: charReducer(state.movements, action),
  }
}