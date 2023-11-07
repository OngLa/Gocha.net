import { useState } from "react";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "./calendar.css"

function Calender() {

  const [startDate, setStartDate] = useState(new Date());


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
    onChange={(date) => setStartDate(date)}
    minDate={new Date()} // 오늘 날짜를 최소 선택 가능 날짜로 설정
      dayClassName={dayClassName} // 날짜별 클래스 이름 설정 함수 사용
    inline />
  
    </div>
  );
}
export default Calender;
