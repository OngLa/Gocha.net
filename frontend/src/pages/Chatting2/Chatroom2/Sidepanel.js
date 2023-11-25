import style from "./sidepanel.module.css";
import { SmallButton } from "../../../components/Button/index";
import breakdownIcon from "../../../img/chatting/breakdownIcon.png";
import { useEffect, useState } from "react";
import { getCarData } from "../../../service/chatting";
import GridCarInfo from "../../../components/GridCarInfo";
import Swal from "sweetalert2";

function Sidepanel({ open, toggle, cardataId }) {

  useEffect(() => {
    const loadingData = async () => {
      try {
        const response = await getCarData(cardataId);
        setCardata(response.data);
      } catch (error) {
        Swal.fire({
          background: "#334E58",
          color: "#FFDA47",
          width: "80vw",
          confirmButtonColor: "#45CB85",
  
          text: error.response.data.message,
          icon: "warning",
          confirmButtonText: "확인",
        });
      }
    }
    loadingData();
  }, []);

  const [cardata, setCardata] = useState({
    canGoDistance: 0,
    distance: 0,
    carBattery: 0,
    batteryCharge: true,
    breakOil: true,
    engineOil: true,
    oil: true,
    tire: true,
    washer: true,
    lampWire: true,
    warming_data: [
      { breakdown_code: "E001", explanation: "에러코드 설명1" },
      { breakdown_code: "E002", explanation: "에러코드 설명2" },
    ]
  });

  return (
    <div className={`${style.sidePanel} ${open ? style.open : ""}`}>
      <div className={style.dataNumber}>{cardataId}번 데이터</div>
      {cardata.warming_data && cardata.warming_data.map((data) => (
        <div className={style.warmingdataWrap}>
          <div className={style.imgWrap}>
            <img src={breakdownIcon} alt="User" />
            <div>{data.breakdown_code}</div>
          </div>
          <div className={style.explanation}>{data.explanation}</div>
        </div>
      ))}
      <hr className={style.hrLine}></hr>
      <div className={style.carStatus}><GridCarInfo item={cardata} layoutType="B" style={{fontSize:"13px", height:"24px"}} ></GridCarInfo></div>
      <div style={{ display: "flex", marginTop: "15px" }}>
        <SmallButton onClick={toggle} style={{ backgroundColor: "#647A76" }}>
          뒤로가기
        </SmallButton>
      </div>
    </div>
  );
}
export default Sidepanel;
