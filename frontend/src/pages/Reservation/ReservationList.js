import { useNavigate } from "react-router-dom";
import ContentHeader from "../../components/ContentHeader";
import LargeButton from "../../components/Button";
import ReservationComponent from "./ReservationComponent";
import { useEffect, useState } from "react";
import { readReservationList } from "../../apis/reservation";

function ReservationList() {

 // //예약목록페이지

const navigate= useNavigate();

const handleNavOnClick=()=>{
  navigate("repairshoplist")
}

const [list,setList] = useState([]);

useEffect(()=>{
  const fetchData = async () =>{
    try {
      const response = await readReservationList();
      setList(response.data);
    }catch(error) {
console.log(error);
    }
  };
fetchData();
},[])

  return (
    <div>
        <div><ContentHeader menuName="예약목록"/></div>

        <div  style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
          <div>
            <ReservationComponent list={list}/>
          </div>
          <div style={{marginTop:"20px"}}>
            <LargeButton onClick={handleNavOnClick}>예약하기</LargeButton></div>
      </div>
        </div>
  );
}
export default ReservationList;