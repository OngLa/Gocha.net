import { useNavigate } from "react-router-dom";
import ContentHeader from "../../components/ContentHeader";
import ReservationComponent from "./ReservationComponent";
import { SmallButton } from "../../components/Button";

function ReservationList() {

  //예약목록페이지

const navigate= useNavigate();

const handleNavOnClick=()=>{
  navigate("./repairshoplist")
}

  return (
    <div>
        <div><ContentHeader menuName="예약목록"/></div>

        <div>
          <ReservationComponent />
        </div>
        <div><SmallButton onClick={handleNavOnClick}>예약하기</SmallButton></div>
    </div>
  );
}
export default ReservationList;