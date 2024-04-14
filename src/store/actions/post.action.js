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
    time: Date.now()
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

  const loggedUser = userService.getLoggedUser();
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

export async function actionOnComment(post, comment) {
  const loggedUser = userService.getLoggedUser()

  if (comment.by.id === loggedUser.id) {
    await deleteComment(post, comment)
  } else {
    reportComment()
  }
}

export function reportComment() {
  console.log("Report!") // TODO: create report comment.
}

export async function deleteComment(post, commentToRemove) {
  const newCommentArray = post.comments.filter((comment) => comment.id != commentToRemove.id)

  try {
    const newPost = await postService.save({ ...post, comments:  newCommentArray});

    store.dispatch({ type: ADD_INTERACTION, post: newPost });
  } catch (err) {
    console.log("Couldn't remove comment, ", err);
  }
  
}
export async function addPost(post) {
}
