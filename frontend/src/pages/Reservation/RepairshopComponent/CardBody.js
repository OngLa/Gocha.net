import { useState } from "react";
import { SmallButton } from "../../../components/Button";
import styels from "./repairshopcomponent.module.css";
import Sidepanel from "./Sidepanel";

function CardBody({id},{address}) {

  const [openSidepanel, setOpenSidepanel] = useState(false);
  //사이드패널 on/off 상태

  const toggleSidepanel = () => {
    setOpenSidepanel(!openSidepanel);
  };
//예약하기 버튼 클릭시 패널 on/off동작

  return (
    <div className={styels.cardBody}>
      <h2>{address}</h2>

      <div style={{paddingTop: "20px", paddingBottom: "10px"}}>
        <SmallButton onClick={toggleSidepanel}>예약하기</SmallButton>
      </div>
      <div>
        {openSidepanel && (<Sidepanel id={id} open={openSidepanel} toggle={toggleSidepanel}/>)}
      </div>
    </div>
  );
}
export default CardBody;
