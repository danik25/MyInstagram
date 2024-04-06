import { storageService } from "./async-storage.service.js";
import dummyPosts from "../assets/data/dummyData.json";

import { utilService } from "./util.service.js";

const POST_STORAGE_KEY = "post";

_createPosts();

// TODO: ADD LOGIN/LOGOUT
// TODO: look for all of the "getLogged user, and remove the redundant. advise Batel."

export const postService = {
  query,
  getById,
  save,
  remove,
};

async function query() {
  const posts = await storageService.query(POST_STORAGE_KEY);
  return posts;
}

async function getById(id) {
  return storageService.get(POST_STORAGE_KEY, id);
}

async function remove(id) {
  return storageService.remove(POST_STORAGE_KEY, id);
}

async function save(post) {
  if (post.id) {
    return storageService.put(POST_STORAGE_KEY, post);
  } else {
    return storageService.post(POST_STORAGE_KEY, post);
  }
}

function _createPosts() {
  let posts = utilService.loadFromStorage(POST_STORAGE_KEY);
  if (!posts || !posts.length) {
    posts = getDummyData();
    utilService.saveToStorage(POST_STORAGE_KEY, posts);
  }
}

function getDummyData() {
  const dummyPostsArr = dummyPosts.posts;
  return dummyPostsArr;
}
