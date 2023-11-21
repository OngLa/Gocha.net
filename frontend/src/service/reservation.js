import axios from "axios";

//예약 출력
export function readReservationList(){
  return axios.get("/member/reservation/list");
}

//예약 하기
export function createReservation(reservationData){
  return axios.post("/member/reservation",reservationData);
}

//예약 취소
export function deleteReservation(id){
  return axios.delete("/member/reservation/" + id);
}

//정비소 출력
export function readCarcenterList(){
  return axios.get("/member/reservation/carcenter");
}

//주정비소 등록
export function createFavoriteCarcenter(carcenterId){
  return axios.post("/member/reservation/favoritecarcenter",carcenterId);
}

//주정비소 출력
export function readFavoriteCarcenter(){
  return axios.get("/member/reservation/favoritecarcenter");
}

//주정비소 삭제
export function deleteFavoriteCarcenter(id){
  return axios.delete("/member/reservation/favoritecarcenter/" + id);
}

//ADMIN예약자 출력
// export function readReservationUserList(){
//   return axios.get("/member/reservation/bookerlist");
// }