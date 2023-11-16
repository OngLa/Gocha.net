import axios from "axios";
import qs from "qs";

// 이메일 인증
export function emailCheck(email) {
  return axios.get("/member/email_check", { params: { email } });
}

// 닉네임 중복
export function nameCheck(nickname) {
  return axios.get("member/name-check", { params: { nickname } });
}  

// 회원가입
export function createMember(memberData) {
  return axios.post("/member/signup", memberData);
}
