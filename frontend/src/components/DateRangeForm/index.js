import { forwardRef, useImperativeHandle, useState } from "react";

import DateInputForm from "./DateInputForm";
import style from "./index.module.css";
import Calendar from "./Calendar";

const DateRangeForm = (props) => {
  const { title, startDate, setStartDate, endDate, setEndDate} = props;

  const [open, setOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState("start");

  const dateFormat = "YYYY-MM-DD";

  // 달력 아이콘 클릭하면, 달력 select box 나옴
  const clickBtn = (dataType) => {
    setCurrentDate(dataType);
    setOpen(!open);
  };

  // 시작일을 나타내는 폼인지, 종료일을 나타내는 폼인지 선택
  const calChange = (date) => {
    const formattedDate = date.format(dateFormat);
    if (currentDate === "start") {
      setStartDate(formattedDate);
    } else {
      setEndDate(formattedDate);
    }

    setOpen(!open);
  };

  // 날짜 입력 시, 정해진 폼에 맞춰서 입력 되도록 설정
  return (
    <div>
      <div className={style.formWrapper}>
        <div className={style.title}>{title}</div>
        <div className={style.form}>
          <DateInputForm
            date={startDate}
            setDate={setStartDate}
            clickBtn={() => clickBtn("start")}
          />
          <div className={style.between}> ~ </div>
          <DateInputForm
            date={endDate}
            setDate={setEndDate}
            clickBtn={() => clickBtn("end")}
          />
        </div>
      </div>

      {open && (
        <div className={style.calendar}>
          <Calendar
            date={currentDate === "start" ? startDate : endDate}
            onChange={calChange}
          />
        </div>
      )}
    </div>
  );
}

export default DateRangeForm;
