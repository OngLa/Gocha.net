import React, { useEffect, useState } from "react";
import style from "./writeForm2.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import LargeButton from "../../../components/Button/index";
import ChatPartnerProfile2 from "../components/ChatPartnerProfile2";
import { sendMessage } from "../../../service/chatting";
import Swal from "sweetalert2";

function WriteForm2(props) {
  // [정비소 메세지 작성 페이지]
  // 제목/내용입력이 가능하며
  // 정비소는 고객과 다르게 예약활성화 체크박스가있다.
  // (고객은 정비소와 다르게 데이터 선택 입력란이 있다.)
  // 데이터 전송 시 채팅방으로 돌아간다.(이 때 url에 고객 이름도 같이 넘기도록함.)

  // 얘내들을 계속 주고 받는 이유는 채팅방에서 상대방이 누군지 알기 위해서이다.
  // id는 메세지 받는 사람을 Be에 넘겨주기 위해서, Name은 좌측 상단에 상대방을 표시하기 위해서이다.
  const [searchParams] = useSearchParams();
  let userId = searchParams.get("userId");
  let userName = searchParams.get("userName");
  let inputTitle = searchParams.get("inputTitle");
  let noReservation = searchParams.get("noReservation");

  // message 객체 상태
  const [message, setMessage] = useState({
    toMemberId: userId,
    title: inputTitle || "",
    content: "",
    selectCar: "",
    isReservation: 0,
    cardataId: null,
  });

  const navigate = useNavigate(); // useNavigate 훅을 사용
  const handleMessage = async () => {
    // title과 content가 모두 공백이 아닌 경우에만 전송
    if (message.title.trim() !== "" && message.content.trim() !== "") {
      try {
        // 데이터 전송
        await sendMessage(message);
        navigate(`/chatting2/chatroom2?userId=${userId}&userName=${userName}`);
      } catch (error) {
        console.log(error);
      }
    } else {
      Swal.fire({
        background: "#334E58",
        color: "#FFDA47",
        width: "80vw",
        confirmButtonColor: "#45CB85",

        text: "제목과 내용을 입력하세요.",
        icon: "info",
        confirmButtonText: "확인",
      });
    }
  };

  return (
    <div className={style.WriteFormWrap}>
      <ChatPartnerProfile2 userName={userName}></ChatPartnerProfile2>
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
      {/* 정비소 예약관리에서 거절사유 혹은 정비완료 시 이 작성폼을 사용하게되는데 이때 예약하기 안보이게함 */}
      { noReservation !== '1' ? (<div className={style.isReservation}>
        <label>
          <input
            className={style.checkBoxInput}
            type="checkbox"
            name="reservation"
            checked={message.isReservation === true}
            onChange={() => {
              const newSelectData =
                message.isReservation === true ? false : true;
              setMessage({ ...message, isReservation: newSelectData });
            }}
          />
          <span className={style.checkBoxLabel}></span>
        </label>
        <div className={style.isReservationText}>예약하기 활성화</div>
      </div>) : (null)}
      

      <div className={style.LargeButtonWrap}>
        <LargeButton
          children="전송하기"
          onClick={() => handleMessage()}
        ></LargeButton>
      </div>
    </div>
  );
}

export default WriteForm2;
