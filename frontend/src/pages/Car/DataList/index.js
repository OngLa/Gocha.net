import Card from "../../../components/Card";
import ContentHeader from "../../../components/ContentHeader";
import LargeButton, { SmallButton } from "../../../components/Button";
import { useEffect, useState } from "react";
import DateRangeForm from "../../../components/DateRangeForm";

import styles from "./style.module.css";
import CustomSelect from "../../../components/CustomSelect";
import { getCarDataList, getMyCar, postCarData } from "../../../service/car";
import GridCarInfo from "../../../components/GridCarInfo";

function DataList() {
  // 내 차량 종류 Selector 데이터 추가
  const [carList, setCarList] = useState([]);
  const [value, setValue] = useState();

  // 페이지 렌더링 시 동작하는 부분
  useEffect(() => {
    const work = async () => {
      try {
        const carListData = await getMyCar();
        setCarList(carListData);
        setValue(0);
      } catch (error) {
        console.error("Failed to fetch CarList:", error);
      }
    };

    work();
  }, []);

  // 차 종류에 따른 다른 데이터 출력
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [cards, setCards] = useState([]);

  // 데이터 불러오기
  const getDataList = async (start, end) => {
    try {
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
      console.log("리다이렉트");
    }
  };

  // 필터 초기화 및 데이터 출력
  useEffect(() => {
    const start = "";
    const end = "";
    setStartDate(start);
    setEndDate(end);
    getDataList(start, end);
  }, [carList, value]);

  // 
  const handlefilter = () => {
    getDataList(startDate, endDate);
  };

  // 최신 데이터 업데이트 버튼
  const handleCards = async () => {
    const req = {
      carId: carList[value].carId,
    };

    const work = async () => {
      await postCarData(req);
    };

    work();
  };

  return (
    <div className={styles.wrapper}>
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
          onClick={handlefilter}
        />
      </div>

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
    </div>
  );
}

export default DataList;
