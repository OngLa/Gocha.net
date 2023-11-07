import { useState } from "react";

import ContentHeader from "../../../components/ContentHeader";
import CustomSelect from "../../../components/CustomSelect";
import LargeButton from "../../../components/Button";
import MycarInfo from "./MycarInfo";

import styles from "./style.module.css";

function Info() {
  const [value, setValue] = useState(0);

  const myCarList = [
    {
      value: 0,
      name: "Sonata",
      distance: 1,
      tire: 1,
      battery: 1,
      status: 1,
      breakOil: 1,
      engineOil: 1,
      washer: 1,
    },
    {
      value: 1,
      name: "Avante",
      distance: 2,
      tire: 2,
      battery: 2,
      status: 2,
      breakOil: 2,
      engineOil: 2,
      washer: 2,
    },
    {
      value: 2,
      name: "Tucson",
      distance: 3,
      tire: 3,
      battery: 3,
      status: 3,
      breakOil: 3,
      engineOil: 3,
      washer: 3,
    },
    {
      value: 3,
      name: "Santa fe",
      distance: 4,
      tire: 4,
      battery: 4,
      status: 4,
      breakOil: 4,
      engineOil: 4,
      washer: 4,
    },
  ];

  const handleRegisterCar = () => {
    console.log("test");
  };

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.mb} ${styles.contentHeader}`}>
        <ContentHeader menuName="내 차 정보" />
      </div>

      <div className={`${styles.mb} ${styles.customSelect}`}>
        <CustomSelect items={myCarList} value={value} setValue={setValue} />
      </div>

      <div className={styles.mb}>
        <img src="https://via.placeholder.com/370x230" alt="sample" />
      </div>

      <div className={styles.mb}>
        <LargeButton
          name="register"
          children="내 차 등록하기"
          onClick={handleRegisterCar}
        />
      </div>

      <div>
        <MycarInfo item={myCarList[value]} />
      </div>
    </div>
  );
}

export default Info;
