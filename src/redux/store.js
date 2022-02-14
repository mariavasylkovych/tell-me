import { applyMiddleware, combineReducers, createStore } from "redux"
import thunk from "redux-thunk"
import { paginateReducer, postReducer, userReducer, announReducer, dataPostReducer, posts } from "./reducer"

const rootReducer = combineReducers({paginateReducer, postReducer, userReducer, announReducer, announReducer, dataPostReducer, posts})

export const store = createStore(rootReducer, applyMiddleware(thunk))