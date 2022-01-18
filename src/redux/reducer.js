import { ADD_DATA_TO_EDIT, ANNOUN_USER, DATA_COMMENT, DATA_USER, GET_POSTS_PAGE } from "./action";


export const postReducer = (state=[], action) => {
    switch (action.type) {
        case ADD_DATA_TO_EDIT:
            const { id, title, body, userId, createdAt, key } = action
            return [
                {
                    id,
                    title,
                    body,
                    userId,
                    createdAt,
                    key
                }
            ]
    
        default:
            return state;
    }
}

export const userReducer = (state=[], action) => {
    switch (action.type) {
        case DATA_USER:
            const { id, email, firstname, lastname, age, avatar } = action
            console.log(email);
            return [
                {
                    id,
                    email,
                    firstname,
                    lastname,
                    age,
                    avatar
                }
            ]
        default:
            return state;
    }
}

export const paginateReducer = (state = [], action) => {
    switch (action.type) {
        case GET_POSTS_PAGE:
            return state= action.posts
        default:
            return state;
    }
}

export const announUserReducer = (state = [], action) => {
    switch (action.type) {
        case ANNOUN_USER:
            return state = action.dataUser
        default:
            return state;
    }
}
export const announReducer = (state = {}, action) => {
    switch (action.type) {
        case ANNOUN_USER:
            console.log(action.data);
            return state = action.data
        default:
            return state;
    }
}