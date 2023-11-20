import React, { useEffect, useRef, useState } from "react";
import style from "./writeForm.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import ChatPartnerProfile from "../components/ChatPartnerProfile";
import LargeButton from "../../../components/Button/index";
import { sendMessage } from "../../../service/chatting";
import axios from "axios";

function WriteForm(props) {
  // [고객 메세지 작성 페이지]
  // 제목/내용입력이 가능하며
  // 고객은 정비소와 다르게 데이터 선택 입력란이 있다.
  // selectbox로 구성되어 있으며 데이터번호&날짜로 구분한다.
  // 데이터 전송 시 채팅방으로 돌아간다.(이 때 url에 정비소 이름도 같이 넘기도록함.)

  const [searchParams] = useSearchParams();
  let carcenterId = searchParams.get("carcenterId");
  let carcenterName = searchParams.get("carcenterName");

  // message 객체 상태
  const [message, setMessage] = useState({
    carcenterId: carcenterId,
    title: "",
    content: "",
    selectCar: "",
    isReservation: 0,
    cardataId: null,
  });

  const [carList, setCarList] = useState([]);
  const [carDataList, setCarDataList] = useState([]);
  useEffect(() => {
    const loadingData = async () => {
      try {
        const response_car = await axios.get(
          "http://localhost:8080/api/chatting/car"
        );
        const response_cardata = await axios.get(
          "http://localhost:8080/api/chatting/cardata"
        );
        setCarList(response_car.data);
        setCarDataList(response_cardata.data);
        window.scrollTo(0, document.body.scrollHeight);
      } catch (error) {
        console.log(error);
      }
    };
    loadingData();
  }, []);

  // 데이터 확인
  useEffect(() => {
    console.log(message);
  }, [message]);

  //예제 데이터
  // const carList = [
  //   {
  //     id: 16,
  //     carNumber: "16가 6666",
  //   },
  //   {
  //     id: 17,
  //     carNumber: "17가 7777",
  //   },
  //   {
  //     id: 18,
  //     carNumber: "18가 8888",
  //   },
  // ];

  // const carDataList = [
  //   {
  //     id: 9,
  //     carId: 16,
  //     lastUpdate: "2023-11-18",
  //   },
  //   {
  //     id: 10,
  //     carId: 16,
  //     lastUpdate: "2023/11/07",
  //   },
  //   {
  //     id: 11,
  //     carId: 17,
  //     lastUpdate: "2023/11/08",
  //   },
  //   {
  //     id: 12,
  //     carId: 18,
  //     lastUpdate: "2023/11/09",
  //   },
  //   {
  //     id: 21,
  //     carId: 18,
  //     lastUpdate: "2023/11/10",
  //   },
  //   {
  //     id: 22,
  //     carId: 18,
  //     lastUpdate: "2023/11/11",
  //   },
  //   {
  //     id: 23,
  //     carId: 18,
  //     lastUpdate: "2023-11-18",
  //   },
  // ];

  const navigate = useNavigate(); // useNavigate 훅을 사용
  const handleMessage = async () => {
    try {
      await sendMessage(message);
      navigate(
        `/chatting/chatroom?carcenterId=${carcenterId}&carcenterName=${carcenterName}`
      );
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

      {/* 차량 선택 */}
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

            // 선택된 차량으로 메시지 상태를 업데이트합니다.
            setMessage({
              ...message,
              selectCar: selectedCarId,
            });
          }}
        >
          <option value="">선택</option>
          {carList.map((car) => (
            <option key={car.id} value={car.id}>
              {car.carNumber}
            </option>
          ))}
        </select>
      </div>

      {/* 데이터 선택 */}
      <div className={style.selectData}>
        <div for="data" className={style.selectDataLabel}>
          데이터 선택:
        </div>
        <select
          className={style.dataSelectBox}
          id="data"
          name="data"
          value={message.cardataId}
          onChange={(e) => {
            const selectedDataId = e.target.value;

            // 선택된 데이터로 메시지 상태를 업데이트합니다.
            setMessage({
              ...message,
              cardataId: parseInt(selectedDataId, 10), // 정수로 변환
            });
          }}
        >
          <option value="">선택</option>
          {carDataList
            .filter((data) => data.carId === parseInt(message.selectCar)) //데이터 필터링
            .map((data) => (
              <option key={data.id} value={data.id}>
                Update - {data.lastUpdate}
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
