import axios from "axios";
import qs from "qs";

export function getBoardList(pageNo = 1) {
  // return axios.get("/board/list", { params: { pageNo : pageNo } });
  return axios.get("/board/list", { params: { pageNo } }); // 같으면 하나로 생략
}

//첨부 파일이 없는 게시물 쓰기
// 위같이 값이 아니라 객체면 qs를 사용해 각각의 값들을 쿼리스트링으로 넘긴다.
export function createBoard(board) {
  return axios.post("/board/create", qs.stringify(board)); //btitle=xxx&bcontent=yyy&bwriter=zzz
}

export function readBoard(bno) {
  return axios.get("/board/read/" + bno);
}

export function deleteBoard(bno) {
  return axios.delete("/board/delete/" + bno);
}

export function updateBoard(board) {
  return axios.put("/board/update", qs.stringify(board)); //bno=xxx&btitle=xxx&bcontent=yyy
}

//첨부 파일이 있는 게시물 쓰기
export function createBoardWithAttach(multipartFormData) {
  return axios.post("/board/createWithAttach", multipartFormData);
}

//첨부 파일 다운로드
export function downloadAttach(bno) {
  return axios.get("/board/battach/" + bno, { responseType: "blob" });
}
