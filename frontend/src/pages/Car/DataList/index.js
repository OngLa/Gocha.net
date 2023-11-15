import Card from "../../../components/Card";
import ContentHeader from "../../../components/ContentHeader";
import LargeButton, { SmallButton } from "../../../components/Button";
import { useRef, useState } from "react";
import DateRangeForm from "../../../components/DateRangeForm";

import styles from "./style.module.css";
import CustomSelect from "../../../components/CustomSelect";

function DataList() {
  const [cards, setCards] = useState([
    { date: "2023-11-08", content: "차량 데이터1" },
    { date: "2023-11-09", content: "차량 데이터2" },
  ]);
  const myCarList = [
    {
      value: 0,
      name: "Sonata",
    },
    {
      value: 1,
      name: "Avante",
    },
    {
      value: 2,
      name: "Tucson",
    },
    {
      value: 3,
      name: "Santa fe",
    },
  ];
  const [card, setCard] = useState({
    date: "",
    content: "",
  });
  const [id, setId] = useState(3);
  const [value, setValue] = useState(0);

  const dateRangeRef = useRef();

  const addCard = (event) => {
    const newCard = {
      ...card,
      date: "2023-11-20",
      content: "차량데이터" + id,
      id: id,
    };

    setCards(cards.concat(newCard));

    setId(id + 1);
    setCard({
      date: "",
      content: "",
    });

    console.log(cards);
  };

  const filterDate = () => {
    const startDate = dateRangeRef.current.getStartDate();
    const endDate = dateRangeRef.current.getEndDate();

    console.log(startDate, endDate);
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
          onClick={addCard}
        />
      </div>

      {/* 내 차량 종류 Selector */}
      <div className={styles.customSelect}>
        <CustomSelect items={myCarList} value={value} setValue={setValue} />
      </div>

      {/* 날짜 필터 폼 */}
      <div className={styles.dateFormWrapper}>
        <div className={styles.dateForm}>
          <DateRangeForm title="검색 날짜" ref={dateRangeRef} />
        </div>
        <SmallButton
          name="filterDate"
          children="검색하기"
          onClick={filterDate}
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
              content_children={item.content}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DataList;
