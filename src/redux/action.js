export const ADD_DATA_TO_EDIT = 'ADD_DATA_TO_EDIT';
export const DATA_USER = 'DATA_USER';
export const GET_POSTS_PAGE = 'GET_POSTS_PAGE';


export const setAddData = ({id, title, body, userId, createdAt, key}) => ({
    type: ADD_DATA_TO_EDIT,
    id, title, body, userId, createdAt, key
})

export const setDataUser = ({id, email, firstname, lastname, age, avatar}) => ({
    type: DATA_USER,
    id, email, firstname, lastname, age, avatar
})

export const setGetPostsPage = async (number, postsPerPage) => async dispatch => {
    const response = await fetch(
        `https://ekreative-json-server.herokuapp.com/posts?_page=${number}&_limit=${postsPerPage}`
    )
        .then(response => response.json())
        .then((data) => {
            return data
        })
    
    dispatch({
        type: GET_POSTS_PAGE,
        posts: response
    })
}