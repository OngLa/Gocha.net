import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ContentHeader from "../../../components/ContentHeader";
import CustomSelect from "../../../components/CustomSelect";
import { SmallButton, SmallButton2 } from "../../../components/Button";
import GridCarInfo from "../../../components/GridCarInfo";

import styles from "./style.module.css";
import { deleteCar, getMyCar, getRecentCarData } from "../../../service/car";
import Swal from "sweetalert2";
import NotFound from "../../NotFound";
import Loading from "../../Loading";

function Info() {
  const navigate = useNavigate();

  // 내 차량 종류 Selector 데이터 추가
  const [carList, setCarList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState();
  const [imgSrc, setImgSrc] = useState();
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

  // 페이지 렌더링 시 동작하는 부분
  useEffect(() => {
    const work = async () => {
      try {
        setIsLoading(true);
        // 등록된 차량 조회
        const response = await getMyCar();

        // 차량이 존재 하면
        setCarList(response);
      } catch (error) {
        setIsLoading(false);
        // 차량이 존재하지 않는다면 alert
        Swal.fire({
          background: "#334E58",
          color: "#FFDA47",
          width: "80vw",
          fontSize: "1px",
          confirmButtonColor: "#45CB85",
          cancelButtonColor: "gray",

          title: error.message,
          text: "차량을 등록하시겠습니까?",
          icon: "warning", // 표시할 아이콘(error, info, question, success, warning)
          confirmButtonText: "등록", // Ok 대신에 쓸 텍스트
          cancelButtonText: "취소", // cancel 대신에 쓸 텍스트
          showCancelButton: true, // cancel 표시 유무
          
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/car/registration");
          }
        });
      } finally {
        // 데이터 다 불러오면 loading 완료
        setIsLoading(false);
      }
    };

    work();
  }, []);

  useEffect(() => {
    setValue(0);
  }, [carList]);

  // carList 값이나 value값이 바뀌는 경우
  // Car Img, Data 불러오기
  useEffect(() => {
    const work = async () => {
      try {
        // 데이터 있으면 출력
        const recentCarData = await getRecentCarData(carList[value].carId);
        setCarData(recentCarData);
      } catch (error) {
        // 데이터 없으면 alert, 데이터 초기화
        console.error(error);
        Swal.fire({
          title: error.message,
          text: `${carList[value].carName} 데이터 업데이트하시겠습니까?`,
          icon: "warning",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "이동",
          cancelButtonText: "취소",

          showCancelButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/car/data-list");
          } else if (result.dismiss) {
            setCarData({
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
          }
        });
      }
    };

    // 데이터 렌더링 완료 되면 결과 출력 -> 에러 방지
    if (carList.length > 0 && value !== undefined) {
      setImgSrc(carList[value].photo);
      work();
    }
  }, [carList, value]);

  // 내 차 등록하기 페이지로 이동
  const handleRegisterCar = () => {
    navigate("/car/registration");
  };

  // 차량 삭제 alert
  const handleDelete = () => {
    Swal.fire({
      title: "내 차 삭제",
      text: "정말 삭제하시겠습니까?",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",

      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        // 삭제 후 새로고침
        await deleteCar(carList[value].carId);
        window.location.reload();
      }
    });
  };

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {/* Content의 헤더, 뒤로가기 기능 */}
          <div className={styles.contentHeader}>
            <ContentHeader menuName="내 차 정보" />
          </div>

          {carList.length > 0 ? (
            <>
              {/* 내 차량 종류 Selector */}
              <div className={`${styles.mb} ${styles.customSelect}`}>
                <CustomSelect
                  items={carList}
                  value={value}
                  setValue={setValue}
                />
              </div>

              {/* 차량 이미지 출력 */}
              <div className={`${styles.mb} ${styles.img}`}>
                <img
                  src={`data:image/png;base64,${imgSrc}`}
                  alt={carList[value].carName}
                />
              </div>

              {/* 내 자동차 정보 출력 */}
              <div className={styles.mb}>
                <GridCarInfo item={carData} layoutType="A" fontSize="20px" />
              </div>
            </>
          ) : (
            <NotFound message="등록된 차량이 존재하지 않습니다." />
          )}

          <div
            className={`${styles.btnWrapper} ${
              carList.length <= 0 && styles.btn
            }`}
          >
            {/* 내 차 등록하기 버튼 > 차량 등록 페이지로 이동 */}
            <div>
              <SmallButton
                name="register"
                children="내 차 등록하기"
                onClick={handleRegisterCar}
              />
            </div>

            {carList.length > 0 && (
              <>
                {/* 내 차 삭제하기 버튼 */}
                <div>
                  <SmallButton2
                    name="delete"
                    children="내 차 삭제"
                    onClick={handleDelete}
                  />
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Info;
