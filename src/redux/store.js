import { applyMiddleware, combineReducers, createStore } from "redux"
import thunk from "redux-thunk"
import { paginateReducer, postReducer, userReducer, announReducer } from "./reducer"

const rootReducer = combineReducers({paginateReducer, postReducer, userReducer, announReducer, announReducer})

export const store = createStore(rootReducer, applyMiddleware(thunk))