import React, { useState } from "react";
import style from "./writeForm2.module.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import LargeButton from "../../../components/Button/index";
import ChatPartnerProfile2 from "../components/ChatPartnerProfile2";

function WriteForm2(props) {
  // [정비소 메세지 작성 페이지]
  // 제목/내용입력이 가능하며
  // 정비소는 고객과 다르게 예약활성화 체크박스가있다.
  // (고객은 정비소와 다르게 데이터 선택 입력란이 있다.)
  // 데이터 전송 시 채팅방으로 돌아간다.(이 때 url에 고객 이름도 같이 넘기도록함.)

  const uno = parseInt(useParams().uno);
  const [searchParams] = useSearchParams();
  let userName = searchParams.get("userName");

  // message 객체 상태
  const [message, setMessage] = useState({
    title: "",
    content: "",
    selectSevervation: "0", // "0"은 체크 안함, "1"은 체크 함
  });

  const navigate = useNavigate(); // useNavigate 훅을 사용
  const sendMessage = (uno) => {
    // message 객체를 이동할 경로로 전달
    // api(`/carcentersendmessage/${uno}/?title=${message.title}&content=${message.content}&selectedData=${message.selectSevervation}`);
    navigate(`/chatting2/chatroom2/${uno}?userName=${userName}`);
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

      <div className={style.selectSevervation}>
        <label>
          <input
            className={style.checkBoxInput}
            type="checkbox"
            name="reservation"
            checked={message.selectSevervation === "1"}
            onChange={() => {
              const newSelectData =
                message.selectSevervation === "1" ? "0" : "1";
              setMessage({ ...message, selectSevervation: newSelectData });
            }}
          />
          <span className={style.checkBoxLabel}></span>
        </label>
        <div className={style.selectSevervationText}>예약하기 활성화</div>
      </div>

      <div className={style.LargeButtonWrap}>
        <LargeButton
          children="전송하기"
          onClick={() => sendMessage(uno)}
        ></LargeButton>
      </div>
    </div>
  );
}

export default WriteForm2;
