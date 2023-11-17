import axios from "axios";

export function readReservationList(){
  return axios.get("http://localhost:8080/api/member/reservation/list");
}
//예약목록 db에서 가지고오는 get-api 

export function createReservation(reservationData){
  return axios.post("http://localhost:8080/api/member/reservation",reservationData);
}
//예약정보 서버로 보내는 post-api 

export function deleteReservation(id){
  return axios.delete("http://localhost:8080/api/member/reservation/" + id);
}
