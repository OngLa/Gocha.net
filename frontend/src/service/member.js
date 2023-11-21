import axios from "axios";
import qs from "qs";

// 이메일 인증번호 요청
export function getVeriCode(veriEmail) {
  return axios.post("/member/email", veriEmail);
}

// 이메일 인증번호 확인
export function compareVeriCode(veriEmail, veriCode) {
  return axios.get("/member/email-veri", { params: { veriEmail, veriCode } });
}

// 닉네임 중복
export function nameCheck(nickname) {
  return axios.get("member/name-check", { params: { nickname } });
}

// 회원가입
export function createMember(member) {
  return axios.post("/member/signup", member);
}

// 마이페이지
export function getMypage(email) {
  return axios.get("/member/mypage");
}
