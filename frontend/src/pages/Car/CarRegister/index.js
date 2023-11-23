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
  const [selectedBrand, setSelectedBrand] = useState();
  const [selectedCar, setSelectedCar] = useState();
  const [carNumber, setCarNumber] = useState();

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
    const data = {
      carNumber: carNumber,
      cartypeId: carTypes[selectedCar].id,
    };

    try {
      await postCar(data);
    } finally {
      Swal.fire({
        title: "차량이 등록 되었습니다.",
        text: `${carNumber}, ${carTypes[selectedCar].name}`,
        icon: "success",
        confirmButtonColor: "#3085d6",
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
