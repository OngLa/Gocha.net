import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ContentHeader from "../../../components/ContentHeader";
import CustomSelect from "../../../components/CustomSelect";
import LargeButton from "../../../components/Button";
import GridCarInfo from "../../../components/GridCarInfo";

import styles from "./style.module.css";
import { getMyCar } from "../../../service/car";

function Info() {
  // 내 차량 종류 Selector 데이터 추가
  const [carList, setCarList] = useState([]);
  const [imgSrc, setImgSrc] = useState("");
  const [value, setValue] = useState();

  // 페이지 렌더링 시 동작하는 부분
  useEffect(() => {
    const work = async () => {
      try {
        const carListData = await getMyCar();
        setCarList(carListData);
        setValue(0);
        setImgSrc(carList[value].photo);
        console.log(carListData);
      } catch (error) {
        console.error("Failed to fetch CarList:", error);
      }
    };

    work();
  }, []);

  // carList 값이나 value값이 바뀌는 경우
  useEffect(() => {
    const work = async () => {
      try {
        setImgSrc(carList[value].photo);
      } catch (error) {
        console.error("Failed to fetch CarList:", error);
      }
    };

    work();
  }, [value]);


  const navigate = useNavigate();

  const myCarList = {
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
  };

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
        <CustomSelect
          items={carList}
          value={value}
          setValue={setValue}
          setImgSrc={setImgSrc}
        />
      </div>

      {/* 차량 이미지 출력 */}
      <div className={`${styles.mb} ${styles.img}`}>
        <img src={`data:image/png;base64,${imgSrc}`} alt="sample" />
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
        <GridCarInfo item={myCarList} layoutType="A" fontSize="20px" />
      </div>
    </div>
  );
}

export default Info;
