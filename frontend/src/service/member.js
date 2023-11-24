import axios from "axios";
import qs from "qs";

// 회원가입 : 이메일 인증번호 요청
export function getVeriCode(veriEmail) {
  return axios.post("/member/email", veriEmail);
}

// 회원가입 : 이메일 인증번호 확인
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

// 비밀번호 찾기/수정 : 이메일 인증번호 요청
export function getPwVeriCode(veriEmail) {
  return axios.post("/member/passwoed", veriEmail);
}

// 비밀번호 찾기/수정 : 이메일 인증번호 확인
export function comparePwVeriCode(veriEmail, veriCode) {
  return axios.get("/member/passwoed-veri", { params: { veriEmail, veriCode } });
}

// 비밀번호 수정
export function editPw(password) {
  return axios.put("/member/update", password);
}

// 회원탈퇴
export function deleteMember() {
  return axios.delete("/member/");
}

