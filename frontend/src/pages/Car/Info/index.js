import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ContentHeader from "../../../components/ContentHeader";
import CustomSelect from "../../../components/CustomSelect";
import LargeButton, { SmallButton2 } from "../../../components/Button";
import GridCarInfo from "../../../components/GridCarInfo";

import styles from "./style.module.css";
import { deleteCar, getMyCar, getRecentCarData } from "../../../service/car";

function Info() {
  // 내 차량 종류 Selector 데이터 추가
  const [carList, setCarList] = useState([]);
  const [imgSrc, setImgSrc] = useState("");
  const [value, setValue] = useState();

  // 페이지 렌더링 시 동작하는 부분
  useEffect(() => {
    const work = async () => {
      try {
        const response = await getMyCar();
        setCarList(response);
        setValue(0);
        setImgSrc(carList[value].photo);
      } catch (error) {
        console.error("Failed to fetch CarList:", error);
      }
    };

    work();
  }, []);

  // carList 값이나 value값이 바뀌는 경우
  // Car Data 불러오기
  const [carData, setCarData] = useState({
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
  });

  useEffect(() => {
    const work = async () => {
      try {
        setImgSrc(carList[value].photo);

        const recentCarData = await getRecentCarData(carList[value].carId);
        setCarData(recentCarData);
      } catch (error) {
        console.log("리다이렉트");
      }
    };

    work();
  }, [carList, value]);

  const navigate = useNavigate();

  const handleRegisterCar = () => {
    navigate("/car/registration");
  };

  const handleDelete = async () => {
    //
    const deleteCarName = await deleteCar(carList[value].carId);
    console.log(deleteCarName.name);
    window.location.reload();
  };

  return (
    <div className={styles.wrapper}>
      {/* Content의 헤더, 뒤로가기 기능 */}
      <div className={styles.contentHeader}>
        <ContentHeader menuName="내 차 정보" />
      </div>

      {/* 내 차량 종류 Selector */}
      <div className={`${styles.mb} ${styles.customSelect}`}>
        <CustomSelect items={carList} value={value} setValue={setValue} />
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
      <div className={styles.mb}>
        <GridCarInfo item={carData} layoutType="A" fontSize="20px" />
      </div>

      {/* 내 차 삭제하기 버튼 */}
      <div className={styles.delBtn}>
        <SmallButton2
          name="delete"
          children="내 차 삭제"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
}

export default Info;
