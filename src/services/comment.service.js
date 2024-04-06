import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";


const COMMENT_STORAGE_KEY = "comment";


export const commentService = {
  query,
  getById,
  save,
  remove,
};

async function query() {
  const comments = await storageService.query(COMMENT_STORAGE_KEY)
  return comments;
}

async function getById(id) {
  return storageService.get(COMMENT_STORAGE_KEY, id)
}

async function remove(id) {
  return storageService.remove(COMMENT_STORAGE_KEY, id);
}

async function save(comment) {
  if (comment.id) {
    return storageService.put(COMMENT_STORAGE_KEY, comment);
  } else {
    return storageService.post(COMMENT_STORAGE_KEY, comment);
  }
}