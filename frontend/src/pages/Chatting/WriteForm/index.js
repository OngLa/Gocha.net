import React, { useState } from "react";
import style from "./writeForm.module.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ChatPartnerProfile from "../components/ChatPartnerProfile";
import LargeButton from "../../../components/Button/index";
import { createMessage, sendMessage } from "../../../apis/chatting";

function WriteForm(props) {
  // [고객 메세지 작성 페이지]
  // 제목/내용입력이 가능하며
  // 고객은 정비소와 다르게 데이터 선택 입력란이 있다.
  // selectbox로 구성되어 있으며 데이터번호&날짜로 구분한다.
  // 데이터 전송 시 채팅방으로 돌아간다.(이 때 url에 정비소 이름도 같이 넘기도록함.)

  const cno = parseInt(useParams().cno);
  const [searchParams] = useSearchParams();
  let carcenterId = searchParams.get("carcenterId");
  let carcenterName = searchParams.get("carcenterName");

  // message 객체 상태
  const [message, setMessage] = useState({
    carcenterId: carcenterId,
    title: "",
    content: "",
    selectCar: "",
    selectData: "",
  });

  const carList = [
    {
      id: "16",
      car_number:"16가 6666"
    },
    {
      id: "17",
      car_number:"17가 7777"
    },
    {
      id: "18",
      car_number:"18가 8888"
    },
  ];

  const carDataList = [
    {
      id: "9",
      car_id: "16",
      last_update: "2023/11/06",
    },
    {
      id: "10",
      car_id: "16",
      last_update: "2023/11/07",
    },
    {
      id: "11",
      car_id: "17",
      last_update: "2023/11/08",
    },
    {
      id: "12",
      car_id: "18",
      last_update: "2023/11/09",
    },
    {
      id: "21",
      car_id: "18",
      last_update: "2023/11/10",
    },
    {
      id: "22",
      car_id: "18",
      last_update: "2023/11/11",
    },
    {
      id: "23",
      car_id: "18",
      last_update: "2023/11/12",
    }
  ];

  // 선택한 차량 ID를 기반으로 carDataList를 필터링하는 함수
  const getFilteredCarData = (selectedCarId) => {
    return carDataList.filter((carData) => carData.car_id === selectedCarId);
  };

  const navigate = useNavigate(); // useNavigate 훅을 사용
  const handleMessage = async () => {
    try {
      await sendMessage(message);
      navigate(`/chatting/chatroom?carcenterId=${carcenterId}&carcenterName=${carcenterName}`)
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div className={style.WriteFormWrap}>
      <ChatPartnerProfile carcenterName={carcenterName}></ChatPartnerProfile>
      <div>
        <div className={style.textWhite}>제목</div>
        <textarea
          className={style.textarea}
          id="message"
          name="message"
          rows="1"
          cols="50"
          placeholder="제목을 입력하세요."
          value={message.title}
          onChange={(e) => setMessage({ ...message, title: e.target.value })}
        ></textarea>

        <div className={style.textWhite}>내용</div>
        <textarea
          className={style.textarea}
          id="message"
          name="message"
          rows="5"
          cols="50"
          placeholder="내용을 입력하세요."
          value={message.content}
          onChange={(e) => setMessage({ ...message, content: e.target.value })}
        ></textarea>
      </div>

      <div className={style.selectData}>
        <div for="car" className={style.selectDataLabel}>
          차량 선택:
        </div>
        <select
          className={style.dataSelectBox}
          id="car"
          name="car"
          value={message.selectCar}
          onChange={(e) => {
            const selectedCarId = e.target.value;
            const filteredCarData = getFilteredCarData(selectedCarId);

            // 선택된 차량으로 메시지 상태를 업데이트하고 선택된 데이터를 지웁니다.
            setMessage({
              ...message,
              selectCar: selectedCarId,
              selectData: "",
            });

            // 상태나 컴포넌트에 carDataList를 업데이트하거나 직접 셀렉트 박스에 전달합니다.
            // (애플리케이션 구조에 따라 달라집니다.)
            // setCarDataList(filteredCarData);
          }}
        >
          <option value="">선택</option>
          {carList.map((car) => (
            <option key={car.id} value={car.id}>
              {car.car_number}
            </option>
          ))}
        </select>
      </div>

      <div className={style.selectData}>
        <div for="carData" className={style.selectDataLabel}>
          데이터 선택:
        </div>
        <select
          className={style.dataSelectBox}
          id="carData"
          name="carData"
          value={message.selectData}
          onChange={(e) =>
            setMessage({ ...message, selectData: e.target.value })
          }
        >
          <option value="">선택</option>
          {getFilteredCarData(message.selectCar).map((carData) => (
            <option key={carData.id} value={carData.id}>
              Update - {carData.last_update}
            </option>
          ))}
        </select>
      </div>

      <div className={style.LargeButtonWrap}>
        <LargeButton
          children="전송하기"
          onClick={() => handleMessage()}
        ></LargeButton>
      </div>
    </div>
  );
}

export default WriteForm;
