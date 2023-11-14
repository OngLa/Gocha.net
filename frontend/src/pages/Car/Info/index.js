import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ContentHeader from "../../../components/ContentHeader";
import CustomSelect from "../../../components/CustomSelect";
import LargeButton from "../../../components/Button";
import GridCarInfo from "../../../components/GridCarInfo";

import styles from "./style.module.css";

function Info() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const myCarList = [
    {
      value: 0,
      name: "Sonata",
      cango_distance: 300,
      distance: 100000,
      car_battery: 5,
      charge_status: true,
      oil: true,
      washer: true,
      tire: true,
      lampwire: true,
      break: true,
      engine: true,
    },
    {
      value: 1,
      name: "Avante",
      cango_distance: 200,
      distance: 1000000,
      car_battery: 100,
      charge_status: false,
      oil: false,
      washer: false,
      tire: false,
      lampwire: false,
      break: false,
      engine: false,
    },
    {
      value: 2,
      name: "Tucson",
      cango_distance: 10,
      distance: 100,
      car_battery: 5,
      charge_status: true,
      oil: false,
      washer: true,
      tire: false,
      lampwire: true,
      break: false,
      engine: true,
    },
  ];

  const handleRegisterCar = () => {
    navigate("/car/registration");
  };

  return (
    <div className={styles.wrapper}>
      {/* Content의 헤더, 뒤로가기 기능 */}
      <div className={styles.contentHeader}>
        <ContentHeader menuName="내 차 정보" />
      </div>

      {/* 내 차량 종류 Selector */}
      <div className={`${styles.mb} ${styles.customSelect}`}>
        <CustomSelect items={myCarList} value={value} setValue={setValue} />
      </div>

      {/* 차량 이미지 출력 */}
      <div className={styles.mb}>
        <img src="https://via.placeholder.com/370x230" alt="sample" />
      </div>

      {/* 내 차 등록하기 버튼 > 차량 등록 페이지로 이동 */}
      <div className={styles.mb}>
        <LargeButton
          name="register"
          children="내 차 등록하기"
          onClick={handleRegisterCar}
        />
      </div>

      {/* 내 자동차 정보 출력 */}
      <div>
        <GridCarInfo item={myCarList[value]} layoutType="A" fontSize='20px'/>
      </div>
    </div>
  );
}

export default Info;
