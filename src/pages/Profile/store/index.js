import { createStore, combineReducers } from "redux"
import claimsReducer from "./reducers/claimsReducer.jsx"

const rootReducer = combineReducers({
  claims: claimsReducer,
})

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
