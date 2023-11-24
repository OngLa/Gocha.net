import { useState } from "react";
import styles from "./index.module.css";
import DateInputForm from "./DateInputForm";
import Calendar from "./Calendar";

// DateRangeForm Component
// Props : startDate(시작 날짜 상태값), setStartDate(상태 처리 함수),
//         endDate(종료 날짜 상태값), setEndDate(상태 처리 함수)
const DateRangeForm = (props) => {
  const { startDate, setStartDate, endDate, setEndDate } = props;

  const [open, setOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState("start");

  const dateFormat = "YYYY-MM-DD";

  // 달력 아이콘 클릭 이벤트 핸들러, 달력 select box 나옴
  const clickBtn = (dataType) => {
    setCurrentDate(dataType);
    setOpen(!open);
  };

  // 달력 날짜선택 이벤트 핸들러, 선택한 날짜 유형에 맞춰 데이터 저장
  const calChange = (date) => {
    const formattedDate = date.format(dateFormat);
    if (currentDate === "start") {
      setStartDate(formattedDate);
    } else {
      setEndDate(formattedDate);
    }

    setOpen(!open);
  };

  return (
    <div>
      <div className={styles.formWrapper}>
        <div className={styles.form}>
          <div className={styles.title}>시작일</div>
          {/* 시작일 */}
          <DateInputForm
            date={startDate}
            setDate={setStartDate}
            clickBtn={() => clickBtn("start")}
          />
        </div>
        <div className={styles.form}>
          <div className={styles.title}>종료일</div>
          {/* 종료일 */}
          <DateInputForm
            date={endDate}
            setDate={setEndDate}
            clickBtn={() => clickBtn("end")}
          />
        </div>
      </div>

      {/* 달력 컴포넌트 조건부 렌더링 */}
      {open && (
        <div className={styles.calendar}>
          <Calendar
            date={currentDate === "start" ? startDate : endDate}
            onChange={calChange}
          />
        </div>
      )}
    </div>
  );
};

export default DateRangeForm;
