import { useState } from "react";
import { SmallButton } from "../../../components/Button";
import styels from "./repairshopList.module.css";
import Sidepanel from "../Sidepanel";

function CardBody(props) {
  const [openSidepanel, setOpenSidepanel] = useState(false);

  const toggleSidepanel = () => {
    setOpenSidepanel(!openSidepanel);
  };
  return (
    <div className={styels.cardBody}>
      <h2>{props.address}</h2>

      <div
        style={{
          paddingTop: "20px",
          paddingBottom: "10px",
        }}
      >
        <SmallButton onClick={toggleSidepanel}>예약하기</SmallButton>
      </div>
      <div>
        {openSidepanel && (
          <Sidepanel open={openSidepanel} toggle={toggleSidepanel} />
        )}
      </div>
    </div>
  );
}
export default CardBody;
