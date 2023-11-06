import { useState } from "react";
import { SmallButton } from "../../../components/Button";
import ShopReservation from "../ShopReservation";
import styels from "./repairshopList.module.css"

function CardBody(props) {

  const [openSidepanel, setOpenSidepanel] = useState(false);

  const toggleSidepanel =() =>{
  setOpenSidepanel(!openSidepanel);
}
  //액시오스로 데이터 받아옴 {address: ""}
  return(
  <div className={styels.cardBody}>

{/* {address} */}
엑시오스로 주소 받아오기

<div style={{
  paddingTop: "20px",
  paddingBottom: "10px"
}}>
  <SmallButton onClick={toggleSidepanel}>예약하기</SmallButton>
  
</div>
<div>
      {openSidepanel &&
        <ShopReservation />}
      </div>
  </div>
);
}
export default CardBody;