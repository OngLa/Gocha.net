import style from "./sidepanel.module.css";
import { SmallButton } from "../../../components/Button/index";
import { useNavigate } from "react-router";
import { useState } from "react";
import breakdownIcon from "../../../img/chatting/breakdownIcon.png";
import GridCarInfo from "../../../components/GridCarInfo";

function Sidepanel({ open, toggle, cardata_id }) {
  const cardata = {
    id: "1",
    car_id: "1",
    last_update: "1",
    cango_distance: "1",
    distance: "1",
    battery_charge: "1",
    car_battery: "1",
    oil: "1",
    washer: "1",
    tire: "1",
    lampwire: "1",
    break: "1",
    engine: "1",
    warming_data: [
      { breakdown_code: "E001", explanation: "에러코드 설명1" },
      { breakdown_code: "E002", explanation: "에러코드 설명2" },
    ],
  };

  return (
    <div className={`${style.sidePanel} ${open ? style.open : ""}`}>
      <div className={style.dataNumber}>{cardata.id}번 데이터</div>
      {cardata.warming_data.map((data) => (
        <div className={style.warmingdataWrap}>
          <div className={style.imgWrap}>
            <img src={breakdownIcon} alt="User" />
            <div>{data.breakdown_code}</div>
          </div>
          <div className={style.explanation}>{data.explanation}</div>
        </div>
      ))}
      <hr className={style.hrLine}></hr>
      <div className={style.carStatus}><GridCarInfo item={cardata} layoutType="B" style={{fontSize:"10px", height:"15px"}} ></GridCarInfo></div>
      <div style={{ display: "flex", marginTop: "15px" }}>
        <SmallButton onClick={toggle} style={{ backgroundColor: "#647A76" }}>
          뒤로가기
        </SmallButton>
      </div>
    </div>
  );
}
export default Sidepanel;
