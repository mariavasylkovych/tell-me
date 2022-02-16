import { applyMiddleware, combineReducers, createStore } from "redux"
import thunk from "redux-thunk"
import { paginateReducer, announcementsReducer, posts, commentsReducer } from "./reducer"

const rootReducer = combineReducers({paginateReducer, announcementsReducer, posts, commentsReducer})

export const store = createStore(rootReducer, applyMiddleware(thunk))