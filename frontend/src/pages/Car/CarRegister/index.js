import { useEffect, useRef, useState } from "react";
import ContentHeader from "../../../components/ContentHeader";
import ImgRadio from "./ImgRadio";
import ToggleList from "./ToggleList";

import styles from "./style.module.css";
import LargeButton from "../../../components/Button";
import { getBrands } from "../../../apis/car";

function CarRegister() {
  const [selectedBrand, setSelectedBrand] = useState();
  const [selectedCar, setSelectedCar] = useState();
  const [carNumber, setCarNumber] = useState("");

  const toggleBrandRef = useRef();
  const toggleCarRef = useRef();

  useEffect(() => {
    toggleBrandRef.current.toggleIsActive();

    if (!toggleCarRef.current.getIsActive()) {
      toggleCarRef.current.toggleIsActive();
    }
  }, [selectedBrand]);

  useEffect(() => {
    toggleCarRef.current.toggleIsActive();
  }, [selectedCar]);

  const handleCarInfo = () => {
    console.log(
      brands[selectedBrand].name,
      carList[selectedCar].name,
      carNumber
    );
  };

  const handleCarNumber = (e) => {
    setCarNumber(e.target.value);
  };

  const carList = [
    { id: 0, src: "https://via.placeholder.com/100x60", name: "아이오닉" },
    { id: 1, src: "https://via.placeholder.com/100x60", name: "코나" },
    { id: 2, src: "https://via.placeholder.com/100x60", name: "넥소" },
    { id: 3, src: "https://via.placeholder.com/100x60", name: "포터" },
    { id: 4, src: "https://via.placeholder.com/100x60", name: "투싼" },
    { id: 5, src: "https://via.placeholder.com/100x60", name: "K5" },
  ];

  // brandList 출력하기
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const work = async () => {
      try {
        const brandsData = await getBrands();
        setBrands(brandsData);
      } catch (error) {
        console.error("Failed to fetch brands:", error);
      }
    };

    work();
  }, []);

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
              items={carList}
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
        <div>{selectedBrand != null ? brands[selectedBrand - 1].name : ""}</div>
        <div>{selectedCar != null ? carList[selectedCar].name : ""}</div>
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
