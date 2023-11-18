import { useState } from "react";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "./calendar.css"

function Calender({onDateChange}) {

  const [startDate, setStartDate] = useState(new Date());

// 날짜를 "yyyy-MM-dd" 형식의 문자열로 포맷하는 함수
const formatDate = (date) => {
  let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
};

 // 날짜가 오늘 이전인지 확인하는 함수
 const isDayBeforeToday = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 시간을 00:00:00.000으로 설정
  return date < today;
};

// 날짜별 클래스 이름을 설정하는 함수
const dayClassName = (date) => {
  return isDayBeforeToday(date) ? 'day-before-today' : '';
};


  return (
    <div className="calender">
   <DatePicker
  selected={startDate}
  onChange={(date) => {
    const formattedDate = formatDate(date); // 날짜를 포맷
    setStartDate(date); // 상태를 업데이트
    onDateChange(formattedDate); // 포맷된 날짜 문자열을 부모 컴포넌트로 전달
  }}
  minDate={new Date()} // 오늘 날짜를 최소 선택 가능 날짜로 설정
  dayClassName={dayClassName} // 날짜별 클래스 이름 설정 함수 사용
  inline
/>
    </div>
  );
}
export default Calender;
