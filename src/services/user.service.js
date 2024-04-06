import { storageService } from "./async-storage.service";

const USER_STORAGE_KEY = "user";

export const userService = {
  getUsers, // TBD: maybe for the 5 presented user at the right
  getById,
  // remove,
  save,
  getLoggedUser,
};

function getUsers() {
  return storageService.query(USER_STORAGE_KEY);
}

async function getById(userId) {
  const user = await storageService.get(USER_STORAGE_KEY, userId);
  // const user = await httpService.get(`user/${userId}`)
  return user;
}

async function save(user) {
  if (user.id) {
    return storageService.put(USER_STORAGE_KEY, user);
  } else {
    return storageService.post(USER_STORAGE_KEY, user);
  }
}

// async function login(userCred) {
//     const users = await storageService.query(USER_STORAGE_KEY)
//     const user = users.find(user => user.id === userCred.username) // TODO: check with the logged in user
//     // const user = await httpService.post('auth/login', userCred)
//     if (user) {
//         return saveLocalUser(user) // TODO: login the user
//     }
// }
// async function signup(user) {
//     const user = await storageService.post(USER_STORAGE_KEY, user)
//     return saveLocalUser(user)
// }

// async function logout() {
//     sessionStorage.removeItem(USER_STORAGE_KEY)  // TODO: change to remove?
//     console.log("dani logout")
//     // return await httpService.post('auth/logout')
// }

// function saveLocalUser(user) {
//     user = { id: user.id, fullname: user.fullname, imgUrl: user.imgUrl, score: user.score }
//     sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
//     return user
// }

function getLoggedUser() {
  return {
    id: 1,
    fullname: "Dani_Benjamin",
    imgUrl:
      "https://res.cloudinary.com/dcn4woh8e/image/upload/v1712397883/WhatsApp_Image_2024-04-05_at_18.15.31_npaqbo.jpg",
  };
}
