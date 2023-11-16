import axios from "axios";

export function readReservationList(){
  return axios.get("http://localhost:8080/api/member/reservation/list")
}