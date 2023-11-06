import Datetime from "react-datetime";
import moment from 'moment';
import 'moment/locale/ko';

import style from "./calendar.module.css";

// 달력 한국어로 설정
moment.locale('ko');

function Calendar(props) {
  const { date, onChange } = props;

  const dateFormat = "YYYY-MM-DD";

  return (
    <div className={style.calWrapper}>
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

export default Calendar;
