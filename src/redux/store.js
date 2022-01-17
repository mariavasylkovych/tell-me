import { applyMiddleware, combineReducers, createStore } from "redux"
import thunk from "redux-thunk"
import { paginateReducer, postReducer, userReducer } from "./reducer"

const rootReducer = combineReducers({paginateReducer, postReducer, userReducer})

export const store = createStore(rootReducer, applyMiddleware(thunk))