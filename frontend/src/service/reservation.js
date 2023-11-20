import axios from "axios";

export function readReservationList(){
  return axios.get("/member/reservation/list");
}
//예약목록 db에서 가지고오는 get-api 

export function createReservation(reservationData){
  return axios.post("/member/reservation",reservationData);
}
//예약정보 서버로 보내는 post-api 

export function deleteReservation(id){
  return axios.delete("/member/reservation/" + id);
}
//예약취소하는 delete api

export function readCarcenterList(){
  return axios.get("/member/reservation/carcenter");
}
//정비소 목록 출력하는 get-api

export function createFavoriteCarcenter(carcenterId){
  return axios.post("/member/reservation/favoritecarcenter",carcenterId);
}
//주정비소 등록 api