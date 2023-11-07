import moment from "moment";

import style from "./dateInputForm.module.css";

function DateInputForm(props) {
  const { date, setDate, clickBtn } = props;

  const dateFormat = "YYYY-MM-DD";

  // 날짜 키보드 입력 시, 정해진 폼에 맞춰서 입력 되도록 설정
  const inputDate = (e) => {
    let currentDate = e.target.value;
    // 날짜 입력 양식 : `YYYY-MM-DD`
    if (currentDate.length === 4 || currentDate.length === 7) {
      currentDate += "-";
    }

    setDate(currentDate);
  };

  // 유효성 검사
  const checkValidDate = (e) => {
    const { value } = e.target;
    const selectedDate = moment(value, dateFormat, true);
    const isValid = selectedDate.isValid();

    if (!isValid) {
      setDate("");
    }
  };

  return (
    <div className={style.form}>
      <input
        type="text"
        className={style.dateInput}
        value={date}
        placeholder={dateFormat}
        onChange={inputDate}
        onBlur={checkValidDate}
      />
      <button className={style.formBtn} type="button" onClick={clickBtn}>
        <img className={style.icon} src="/icon/Calendar.png"></img>
      </button>
    </div>
  );
}

export default DateInputForm;
