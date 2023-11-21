import { useState } from "react";
import { SmallButton } from "../../../components/Button";
import styels from "./repairshopcomponent.module.css";
import Sidepanel from "./Sidepanel";

function CardBody({carcenter}) {

  const [openSidepanel, setOpenSidepanel] = useState(false);

  //예약하기 버튼 클릭시 패널 on/off동작
  const toggleSidepanel = () => {
    setOpenSidepanel(!openSidepanel);
  };

  return (
    <div>
      <div className={styels.cardBody}>
        <h2>주소</h2>
        <h3>{carcenter.address}</h3>
  
        <div className="SmallButton">
          <SmallButton onClick={toggleSidepanel}>예약하기</SmallButton>
        </div>
      </div>
      <div>
        {openSidepanel && (<Sidepanel carcenter={carcenter} open={openSidepanel} toggle={toggleSidepanel}/>)}
      </div>
    </div>
  );
}
export default CardBody;
