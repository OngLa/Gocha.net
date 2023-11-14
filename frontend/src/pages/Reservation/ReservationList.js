import { useNavigate } from "react-router-dom";
import ContentHeader from "../../components/ContentHeader";
import ReservationComponent from "./ReservationComponent";
import LargeButton from "../../components/Button";

function ReservationList() {

  //예약목록페이지

const navigate= useNavigate();

const handleNavOnClick=()=>{
  navigate("repairshoplist")
}

  return (
    <div>
        <div><ContentHeader menuName="예약목록"/></div>

        <div  style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
          <div>
            <ReservationComponent />
          </div>
          <div style={{marginTop:"20px"}}>
            <LargeButton onClick={handleNavOnClick}>예약하기</LargeButton></div>
      </div>
        </div>
  );
}
export default ReservationList;