// import
import React from "react";
import moment from "moment";
import Swal from "sweetalert2";
import styles from "./dateInputForm.module.css";
import calendarIcon from "../../img/icon/Calendar.png";

// DataInputForm Component
// Props : date(입력한 날짜에 대한 상태), setDate(상태 처리 함수) clickBtn(버튼 이벤트 리스너 함수)
function DateInputForm(props) {
  const { date, setDate, clickBtn } = props;
  const dateFormat = "YYYY-MM-DD";

  // 날짜 키보드 입력 시, 정해진 폼에 맞춰서 입력 되도록 설정
  // 날짜 입력 양식 : `YYYY-MM-DD`
  const inputDate = (e) => {
    let input = e.target.value;
    input = input.replace(/\D/g, "");

    if (input.length <= 4) {
    } else if (input.length <= 6) {
      input = `${input.slice(0, 4)}-${input.slice(4)}`;
    } else {
      input = `${input.slice(0, 4)}-${input.slice(4, 6)}-${input.slice(6)}`;
    }

    setDate(input);
  };

  // 날짜 입력값에 대한 유효성 검사
  const checkValidDate = (e) => {
    const { value } = e.target;
    const selectedDate = moment(value, dateFormat, true);
    const isValid =
      selectedDate.isValid() &&
      0 <= selectedDate.month() &&
      selectedDate.month() <= 11 &&
      1 <= selectedDate.date() &&
      selectedDate.date() <= selectedDate.daysInMonth();

    // 날짜가 유효한 데이터가 아니면 경고 메세지
    if (!isValid) {
      Swal.fire({
        background: "#334E58",
        color: "#FFDA47",
        width: "80vw",
        confirmButtonColor: "#45CB85",
        title: "유효하지 않은 날짜 형식입니다.",
        text: "ex) 2023-11-24",
        icon: "warning",
        confirmButtonText: "확인",
      });
    }
  };

  return (
    <div className={styles.form}>
      <input
        type="text"
        className={styles.dateInput}
        value={date}
        placeholder={dateFormat}
        onChange={inputDate}
        onBlur={checkValidDate}
      />
      <button className={styles.formBtn} type="button" onClick={clickBtn}>
        <img className={styles.icon} src={calendarIcon}></img>
      </button>
    </div>
  );
}

// Component 최적화, Props 값의 변화에 따른 리랜더링 방지
export default React.memo(DateInputForm);
