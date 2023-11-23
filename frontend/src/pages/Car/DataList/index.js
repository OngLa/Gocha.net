import Card from "../../../components/Card";
import ContentHeader from "../../../components/ContentHeader";
import LargeButton, { SmallButton } from "../../../components/Button";
import { useEffect, useState } from "react";
import DateRangeForm from "../../../components/DateRangeForm";

import styles from "./style.module.css";
import CustomSelect from "../../../components/CustomSelect";
import { getCarDataList, getMyCar, postCarData } from "../../../service/car";
import GridCarInfo from "../../../components/GridCarInfo";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Loading from "../../Loading";
import NotFound from "../../NotFound";

function DataList() {
  const navigate = useNavigate();

  // 내 차량 종류 Selector 데이터 추가
  const [isLoading, setIsLoading] = useState(true);
  const [carList, setCarList] = useState([]);
  const [value, setValue] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [cards, setCards] = useState([]);

  // 페이지 렌더링 시 동작하는 부분
  useEffect(() => {
    const work = async () => {
      try {
        setIsLoading(true);
        const carListData = await getMyCar();
        setCarList(carListData);
      } catch (error) {
        setIsLoading(false);
        Swal.fire({
          title: error.message,
          text: "차량을 등록하시겠습니까?",
          icon: "question",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "등록",
          cancelButtonText: "취소",

          showCancelButton: true,
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

  // 필터 초기화 및 데이터 출력
  useEffect(() => {
    const start = "";
    const end = "";
    setStartDate(start);
    setEndDate(end);

    // 데이터 렌더링 완료 되면 결과 출력 -> 에러 방지
    if (carList.length > 0 && value !== undefined) {
      getCarData(start, end);
    }
  }, [carList, value]);

  const handleCards = async () => {
    createCarData();
  };

  const handleFilter = async () => {
    getCarData(startDate, endDate, false);
  };

  // 데이터 불러오기
  const getCarData = async (start, end, showAlert = true) => {
    try {
      setIsLoading(true);

      // Request Param으로 보낼 값들
      const req = {
        carId: carList[value].carId,
        startDate: start,
        endDate: end,
      };

      // api 호출
      const response = await getCarDataList(req);

      // 각 호출 결과 card에 저장
      const newCards = response.map((item) => ({
        date: item.lastUpdate,
        content: {
          canGoDistance: item.canGoDistance,
          distance: item.distance,
          carBattery: item.carBattery,
          batteryCharge: item.batteryCharge,
          breakOil: item.breakOil,
          engineOil: item.engineOil,
          oil: item.oil,
          tire: item.tire,
          washer: item.washer,
          lampWire: item.lampWire,
        },
      }));

      // card list 저장
      setCards(newCards);
    } catch (error) {
      if (showAlert) {
        Swal.fire({
          title: error.message,
          text: "데이터를 등록하시겠습니까?",
          icon: "question",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "등록",
          cancelButtonText: "취소",

          showCancelButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            createCarData();
          } else if (result.isDismissed) {
            setCards([]);
          }
        });
      } else {
        setCards([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 최신 데이터 업데이트 버튼
  const createCarData = async () => {
    try {
      const req = {
        carId: carList[value].carId,
      };
      await postCarData(req);
    } finally {
      Swal.fire({
        title: "데이터가 등록 되었습니다.",
        text: `${carList[value].carName}`,
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      }).then(async (result) => {
        window.location.reload();
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {/* Content의 헤더, 뒤로가기 기능 */}
          <div className={styles.menu}>
            <ContentHeader menuName="데이터 관리" />
          </div>

          {/* 최신 데이터 업데이트 버튼, 버튼 클릭 시 새로운 데이터 추가 */}
          <div className={styles.addCardBtn}>
            <LargeButton
              name="update"
              children="최신 데이터 업데이트"
              onClick={handleCards}
            />
          </div>

          {/* 내 차량 종류 Selector */}
          <div className={styles.customSelect}>
            <CustomSelect items={carList} value={value} setValue={setValue} />
          </div>

          {/* 날짜 필터 폼 */}
          <div className={styles.dateFormWrapper}>
            <div className={styles.dateForm}>
              <DateRangeForm
                title="검색 날짜"
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
              />
            </div>
            <SmallButton
              name="filterDate"
              children="검색하기"
              onClick={handleFilter}
            />
          </div>

          {cards.length > 0 ? (
            <>
              {/* Card 리스트 출력 */}
              <div className={styles.cardList}>
                {cards.map((item) => (
                  <div className={styles.card}>
                    <Card
                      key={item.id}
                      title_children={
                        <>
                          <div>날짜 : </div>
                          <div style={{ marginLeft: "5px" }}>{item.date}</div>
                        </>
                      }
                      content_children={
                        <GridCarInfo
                          item={item.content}
                          layoutType="C"
                          fontSize="15px"
                        />
                      }
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <NotFound message="데이터가 존재하지 않습니다." />
          )}
        </>
      )}
    </div>
  );
}

export default DataList;
