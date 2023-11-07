import React, { useState } from "react";
import style from "./writeForm.module.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ChatPartnerProfile from "../components/ChatPartnerProfile";
import LargeButton from "../../../components/Button/index";

function WriteForm(props) {
  // [고객 메세지 작성 페이지]
  // 제목/내용입력이 가능하며
  // 고객은 정비소와 다르게 데이터 선택 입력란이 있다.
  // selectbox로 구성되어 있으며 데이터번호&날짜로 구분한다.
  // 데이터 전송 시 채팅방으로 돌아간다.(이 때 url에 정비소 이름도 같이 넘기도록함.)

  const cno = parseInt(useParams().cno);
  const [searchParams] = useSearchParams();
  let carcenterName = searchParams.get("carcenterName");

  // message 객체 상태
  const [message, setMessage] = useState({
    title: "",
    content: "",
    selectData: "",
  });

  const carDataList = [
    {
      id: "3",
      last_update: "2023/11/06",
    },
    {
      id: "3",
      last_update: "2023/11/05",
    },
    {
      id: "2",
      last_update: "2023/11/04",
    },
    {
      id: "1",
      last_update: "2023/11/03",
    },
  ];

  const navigate = useNavigate(); // useNavigate 훅을 사용
  const sendMessage = (cno) => {
    // message 객체를 이동할 경로로 전달
    // api(`/usersendmessage/${cno}/?title=${message.title}&content=${message.content}&selectedData=${message.selectData}`);
    navigate(`/chatting/chatroom/${cno}?carcenterName=${carcenterName}`);
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
        <div for="carData" className={style.selectDataLabel}>
          데이터 선택 :{" "}
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
          {carDataList.map((carData) => (
            <option value={carData.id}>
              데이터{carData.id} ({carData.last_update})
            </option>
          ))}
        </select>
      </div>

      <div className={style.LargeButtonWrap}>
        <LargeButton
          children="전송하기"
          onClick={() => sendMessage(cno)}
        ></LargeButton>
      </div>
    </div>
  );
}

export default WriteForm;
