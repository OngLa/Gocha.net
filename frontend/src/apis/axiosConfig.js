import axios from "axios";

// axios 기본 경로(/api까지)
axios.defaults.baseURL = "http://localhost:8080/api";

// 로그인, 새로고침 시 header에 토큰 저장
export function addAuthHeader(accessToken) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
}

// 로그아웃 시 header에 토큰 제거
export function removeAuthHeader() {
  delete axios.defaults.headers.common["Authorization"];
}
