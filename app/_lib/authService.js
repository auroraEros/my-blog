import http from "./httpService";

export async function signupApi(data) {
  return await http.post("/user/signup", data).then(({ data }) => data.data);
}

export async function signinApi(data) {
  return await http.post("/user/signin", data).then(({ data }) => data.data);
}

export async function getUserApi() {
  return await http.get("/user/profile").then(({ data }) => data.data);
}

export async function getAllUsersApi(options = {}) {
  return await http.get("/user/list", options).then(({ data }) => data.data);
}

export async function updateUserApi(data) {
  return await http.patch("/user/update", data).then(({ data }) => data.data);
}

export async function uploadAvatarApi(data, options = {}) {
  return await http
    .post("/user/upload-avatar", data, options)
    .then(({ data }) => data.data);
}

export async function logoutApi() {
  return await http.post("/user/logout");
}


