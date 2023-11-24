import { useEffect, useState } from "react";
import ContentHeader from "../../../components/ContentHeader";
import LargeButton from "../../../components/Button";
import ImgRadio from "./ImgRadio";
import ToggleList from "./ToggleList";
import Loading from "../../Loading";
import styles from "./style.module.css";
import { getBrands, getCarTypes, postCar } from "../../../service/car";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function CarRegister() {
  const [isLoading, setIsLoading] = useState(true);
  const [bToggle, setBToggle] = useState(true);
  const [cToggle, setCToggle] = useState(false);
  const [brands, setBrands] = useState([]);
  const [carTypes, setCarTypes] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCar, setSelectedCar] = useState("");
  const [carNumber, setCarNumber] = useState("");

  const navigate = useNavigate();

  // 렌더링 시, brandList 출력하기
  useEffect(() => {
    const work = async () => {
      try {
        setIsLoading(true);

        const brandsData = await getBrands();
        setBrands(brandsData);
      } finally {
        setIsLoading(false);
        setBToggle(true);
        setCToggle(false);
      }
    };

    work();
  }, []);

  // brandList 선택 시, CarTypeList 출력하기
  useEffect(() => {
    const work = async () => {
      try {
        const carTypeData = await getCarTypes(brands[selectedBrand].id);
        setCarTypes(carTypeData);
      } finally {
        setSelectedCar("");
        setBToggle(!bToggle);
        setCToggle(true);
      }
    };

    if (!(selectedBrand === undefined || selectedBrand === "")) {
      work();
    }
  }, [selectedBrand]);

  const handleCarNumber = (e) => {
    setCarNumber(e.target.value);
  };

  // 차량 등록
  const handleCarInfo = async () => {
    // 차량 번호판 형식 검사를 위한 정규 표현식
    const carNumberRegex = /^[0-9]{2,3}\s[가-힣]{1}\s[0-9]{4}$/;

    // 차 종 선택 안했을 때
    if (selectedCar === "") {
      Swal.fire({
        // 수정x
        background: "#334E58",
        color: "#FFDA47",
        width: "80vw",
        confirmButtonColor: "#45CB85",

        // 커스텀
        title: "차량이 선택되지 않았습니다.",
        text: "선택해 주세요",
        icon: "warning", // 표시할 아이콘(error, info, question, success, warning)
        confirmButtonText: "등록", // Ok 대신에 쓸 텍스트
      });
      return;
    }

    // 차량 번호판 형식 검사
    if (!carNumberRegex.test(carNumber)) {
      Swal.fire({
        // 수정x
        background: "#334E58",
        color: "#FFDA47",
        width: "80vw",
        confirmButtonColor: "#45CB85",

        // 커스텀
        title: "차량 번호판 형식이 올바르지 않습니다.",
        text: "예) 50 우 1934",
        icon: "warning", // 표시할 아이콘(error, info, question, success, warning)
        confirmButtonText: "등록", // Ok 대신에 쓸 텍스트
      });
      return;
    }

    const data = {
      carNumber: carNumber,
      cartypeId: carTypes[selectedCar].id,
    };

    try {
      await postCar(data);
    } finally {
      Swal.fire({
        background: "#334E58",
        color: "#FFDA47",
        width: "80vw",
        confirmButtonColor: "#45CB85",
        cancelButtonColor: "gray",

        title: "차량이 등록 되었습니다.",
        text: `${carNumber}, ${carTypes[selectedCar].name}`,
        icon: "success",
        confirmButtonText: "확인",
      }).then(async (result) => {
        navigate("/car/info");
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
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
              toggle={bToggle}
              setToggle={setBToggle}
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
              toggle={cToggle}
              setToggle={setCToggle}
            />
          </div>

          <div className={styles.resWrapper}>
            <div>
              {typeof selectedBrand === "number" && brands[selectedBrand].name}
            </div>
            <div>
              {typeof selectedCar === "number" && carTypes[selectedCar].name}
            </div>
          </div>

          <div className={styles.inputWrapper}>
            <div className={styles.tag}>차량 번호</div>
            <input
              type="text"
              placeholder="ex) 50 우 1934"
              value={carNumber}
              onChange={handleCarNumber}
            />
          </div>

          <div>
            <LargeButton children="등록하기" onClick={handleCarInfo} />
          </div>
        </>
      )}
    </div>
  );
}

export default CarRegister;
