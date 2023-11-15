import { useEffect, useRef, useState } from "react";
import ContentHeader from "../../../components/ContentHeader";
import ImgRadio from "./ImgRadio";
import ToggleList from "./ToggleList";

import styles from "./style.module.css";
import LargeButton from "../../../components/Button";
import { getBrands, getCarTypes } from "../../../apis/car";

function CarRegister() {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCar, setSelectedCar] = useState("");
  const [carNumber, setCarNumber] = useState("");

  const toggleBrandRef = useRef();
  const toggleCarRef = useRef();

  useEffect(() => {
    if(selectedCar !== "") {
      toggleCarRef.current.toggleIsActive();
    }
  }, [selectedCar]);

  // brandList 출력하기
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const work = async () => {
      try {
        const brandsData = await getBrands();
        setBrands(brandsData);
        console.log(brandsData);
      } catch (error) {
        console.error("Failed to fetch brands:", error);
      }
    };

    work();
  }, []);

  // CarTypeList 출력하기
  const [carTypes, setCarTypes] = useState([]);

  useEffect(() => {
    setSelectedCar("");
    toggleCarRef.current.handleToggle(true);

    const work = async () => {
      try {
        const carTypeData = await getCarTypes(brands[selectedBrand].id);
        setCarTypes(carTypeData);
      } catch (error) {
        console.error("Failed to fetch brands:", error);
      }
    };

    toggleBrandRef.current.toggleIsActive();

    work();

    // if (!toggleCarRef.current.getIsActive()) {
    //   toggleCarRef.current.toggleIsActive();
    // }
  }, [selectedBrand]);

  const handleCarNumber = (e) => {
    setCarNumber(e.target.value);
  };
  const handleCarInfo = () => {
    console.log(
      brands[selectedBrand].name,
      carTypes[selectedCar].name,
      carNumber
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.contentHeader}>
        <ContentHeader menuName="내 차 등록하기" />
      </div>

      <div className={styles.toggleWrapper}>
        <ToggleList
          title_children={"Brand"}
          content_children={
            <ImgRadio
              items={brands}
              name={"brand"}
              selected={selectedBrand}
              setSelected={setSelectedBrand}
            />
          }
          initActive={false}
          ref={toggleBrandRef}
        />

        <ToggleList
          title_children={"Car"}
          content_children={
            <ImgRadio
              items={carTypes}
              name={"car"}
              selected={selectedCar}
              setSelected={setSelectedCar}
            />
          }
          initActive={true}
          ref={toggleCarRef}
        />
      </div>

      <div className={styles.resWrapper}>
        <div>{selectedBrand !== "" ? brands[selectedBrand].name : ""}</div>
        <div>{selectedCar !== "" ? carTypes[selectedCar].name : ""}</div>
      </div>

      <div className={styles.inputWrapper}>
        <div className={styles.tag}>차량 번호</div>
        <input
          type="text"
          placeholder="50 우 1934"
          value={carNumber}
          onChange={handleCarNumber}
        />
      </div>

      <div>
        <LargeButton children="등록하기" onClick={handleCarInfo} />
      </div>
    </div>
  );
}

export default CarRegister;
