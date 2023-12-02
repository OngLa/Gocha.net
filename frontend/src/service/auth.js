import axios from "axios"
import qs from "qs";

export function login(member) {
  console.log("Login Input member: " + qs.stringify(member));
  return axios.post("/auth/login", member);
}

export function googleLogin (member) {
  return axios.post("/auth/user", member);
}

