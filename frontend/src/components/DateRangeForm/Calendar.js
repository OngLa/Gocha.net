// import
import React from "react";
import Datetime from "react-datetime";
import moment from "moment";
import "moment/locale/ko";
import styles from "./calendar.module.css";

// 달력에 기본 언어를 한국어로 설정
moment.locale("ko");

// Calendar Component
// Props : date(선택된 날짜), onChange(날짜 변경 핸들러)
function Calendar(props) {
  const { date, onChange } = props;

  // 날짜 형식
  const dateFormat = "YYYY-MM-DD";

  return (
    <div className={styles.calWrapper}>
      <Datetime
        value={date}
        dateFormat={dateFormat}
        timeFormat={false}
        input={false}
        onChange={onChange}
        locale="ko"
      />
    </div>
  );
}

// Component 최적화, Props 값의 변화에 따른 리랜더링 방지
export default React.memo(Calendar);
