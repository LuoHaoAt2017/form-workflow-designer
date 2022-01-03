import axios from "@/utils/axios";

export function GetUserInfo(userId) {
  return axios.request({
    url: "/GetUserById",
    method: "GET",
    params: {
      userId: userId
    }
  });
}

export function Login({ username, password }) {
  return axios.request({
    url: "/login-password",
    method: "POST",
    data: {
      username,
      password,
    },
  });
}

export function Logout() {
  return axios.request({
    url: "/logout",
    method: "GET"
  });
}

export function Register({ username, password }) {
  return axios.request({
    url: "/register",
    method: "PUT",
    data: {
      username,
      password,
    },
  });
}

export function Destory({ username, password }) {
  return axios.request({
    url: "/destory",
    method: "DELETE",
    data: {
      username,
      password,
    },
  });
}

export function AuthGithub() {
  return axios.request({
    url: "/github-auth",
    method: "GET",
  });
}

export function AuthDing() {
  return axios.request({
    url: "/ding-auth",
    method: "GET",
  });
}

export function GetUsers() {
  return axios.request({
    url: "/getAllUser",
    method: "get"
  });
}

export function GetUsersWithRole() {
  return axios.request({
    url: "/getUsersWithRole",
    method: "get"
  });
}

export function UpdateUserRoles({
  userId,
  roles
}) {
  return axios.request({
    url: "/setUserRoles",
    method: "get",
    params: {
      roles: roles,
      userId: userId,
    }
  });
}

export function GetRoles() {
  return axios.request({
    url: "/getAllRoles",
    method: "get"
  });
}