export const ADD_POST = 'ADD_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const SET_POSTS = 'SET_POSTS'

const initialState = {
    posts: [],
}

export function postReducer(state = initialState, action) {
    var newState = state
    var posts

    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                posts: action.posts
            }
        case ADD_POST:
            newState = { ...state, posts: [...state.posts, action.post] }
            break
        case UPDATE_POST:
            posts = state.posts.map(post => (post._id === action.post._id) ? action.post : post)
            newState = { ...state, posts }
            break
        default:
    }
    return newState
}
