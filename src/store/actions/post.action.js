import { store } from "../store.js";

import {
  SET_POSTS,
  ADD_INTERACTION,
  ADD_COMMENT, // TODO: for granular interaction
} from "../reducers/post.reducer";

// Services
import { postService } from "../../services/post.service";
import { userService } from "../../services/user.service.js";
import { utilService } from "../../services/util.service.js";

export async function addComment(post, commentContent) {
  const newComment = {
    id: utilService.makeId(),
    by: userService.getLoggedUser(),
    txt: commentContent,
    likedBy: [],
  };

  post.comments.push(newComment);
  try {
    const newPost = await postService.save(post);
    console.log(`post: ${newPost}, comment: ${commentContent}`);
    store.dispatch({ type: ADD_INTERACTION, post: newPost });
  } catch (err) {
    console.log("Couldn't update post, ", err);
  }
}

export async function toggleCommentLike(post, comment, isLike) {
  const loggedUser = userService.getLoggedUser();
  const commentIndex = post.comments.findIndex((postComment) => {
    return postComment.id === comment.id;
  });

  if (isLike) {
    post.comments[commentIndex].likedBy.push(loggedUser);
    // currentComment.likedBy.push(loggedUser);
  } else {
    const newLikeArray = post.comments[commentIndex].likedBy.filter(
      (likeUser) => likeUser.id !== loggedUser.id
    );
    post.comments[commentIndex].likedBy = newLikeArray;
  }

  console.log("post: ", post);
  try {
    const updatedPost = await postService.save(post);
    console.log("updatedPost: ", updatedPost);
    store.dispatch({ type: ADD_INTERACTION, post: updatedPost });
  } catch (err) {
    console.log("Couldn't update post, ", err);
  }
}

export async function togglePostLike(post, isLike) {
  // const post = await postService.getById(postId);
  // if (!post) {
  //   console.log("Can't find post");
  // }

  const loggedUser = userService.getLoggedUser();
  // Adding the new comment, to the post
  if (isLike) {
    post.likedBy.push(loggedUser);
  } else {
    const newLikeArray = post.likedBy.filter(
      (likeUser) => likeUser.id !== loggedUser.id
    );
    post.likedBy = newLikeArray;
  }

  try {
    const newPost = await postService.save(post);

    store.dispatch({ type: ADD_INTERACTION, post: newPost });
  } catch (err) {
    console.log("Couldn't update post, ", err);
  }
}

export async function loadPosts() {
  try {
    const posts = await postService.query();
    store.dispatch({ type: SET_POSTS, posts });
  } catch (err) {
    console.log("PostActions: err in loadPosts", err);
    throw err;
  }
}

export async function addPost(post) {
  // try {
  //     const addedReview = await postService.add(post)
  //     store.dispatch(getActionAddReview(addedReview))
  //     const { score } = addedReview.byUser
  //     userService.updateLocalUserFields({ score })
  //     store.dispatch({ type: SET_SCORE, score })
  // } catch (err) {
  //     console.log('ReviewActions: err in addReview', err)
  //     throw err
  // }
}
