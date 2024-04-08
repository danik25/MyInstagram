export const SET_POSTS = "SET_POSTS";
export const ADD_INTERACTION = "ADD_INTERACTION";
export const ADD_COMMENT = "ADD_COMMENT";

const initialState = {
  posts: [],
};

export function postReducer(state = initialState, action) {
  var newState = state;
  var posts;

  switch (action.type) {
    case SET_POSTS:
      return {
        posts: action.posts,
      };
    case ADD_INTERACTION:
      return {
        posts: state.posts.map((post) =>
          post.id === action.post.id ? action.post : post
        ),
      };
    // case ADD_COMMENT:
    //     return {
    //         posts: state.posts.map((post) => {
    //             if (post.id === action.post.id) {
    //                 post.comments = post.comments.push(action.newComment)
    //                 return post
    //             }
    //             return post

    //         })
    //     }
    default:
  }
  return newState;
}
