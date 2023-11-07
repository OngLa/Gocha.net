import React from "react";
import style from "./chatroom.module.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ChatBox from "./ChatBox";
import LargeButton from "../../../components/Button/index";
import ChatPartnerProfile from "../components/ChatPartnerProfile";

function Chatroom(props) {
  // [고객과 정비소의 채팅방]
  // 고객의 메세지는 우측 초록색 박스로 표현
  // 정비소의 메세지는 좌측 회색 박스로 표현
  // 제목/내용/전송날짜/예약버튼/작성버튼을 포함.
  // 예약버튼의 경우 정비소가 글작성시 예약버튼 활성화를 누를 경우에만 생성된다.

  const cno = parseInt(useParams().cno);
  const [searchParams] = useSearchParams();
  let carcenterName = searchParams.get("carcenterName");

  const messageList = [
    {
      id: "1",
      chatting_id: "2",
      sender_id: "1",
      carcenter_id: null,
      send_date: new Date().toLocaleDateString(),
      title: "고객:문의입니다.",
      contents: "내용1입니다.",
      is_reservation: "0",
      breakdown_id: "0",
    },
    {
      id: "1",
      chatting_id: "2",
      sender_id: null,
      carcenter_id: "1",
      send_date: new Date().toLocaleDateString(),
      title: "정비소:답변입니다.",
      contents: "내용2입니다.",
      is_reservation: "1",
      breakdown_id: "0",
    },
    {
      id: "1",
      chatting_id: "3",
      sender_id: null,
      carcenter_id: "1",
      send_date: new Date().toLocaleDateString(),
      title: "정비소:답변입니다.",
      contents: "내용3입니다.",
      is_reservation: "1",
      breakdown_id: "0",
    },
  ];

  const navigate = useNavigate(); // useNavigate 훅을 사용
  const moveWrite = (cno) => {
    navigate(`/chatting/writeform/${cno}?carcenterName=${carcenterName}`);
  };

  return (
    <div className={style.ChatroomWrap}>
      <ChatPartnerProfile carcenterName={carcenterName}></ChatPartnerProfile>
      {messageList.map((message) =>
        message.sender_id !== null ? (
          <div className={style.ChatboxSenderWrap}>
            <ChatBox
              title={message.title}
              contents={message.contents}
              send_date={message.send_date}
              issender="1"
            ></ChatBox>
          </div>
        ) : (
          <div className={style.ChatboxWrap}>
            <ChatBox
              title={message.title}
              contents={message.contents}
              send_date={message.send_date}
              is_reservation={message.is_reservation}
              issender="0"
            ></ChatBox>
          </div>
        )
      )}
      <div className={style.SmallButtonWrap}>
        <LargeButton
          children="작성하기"
          onClick={() => moveWrite(cno)}
        ></LargeButton>
      </div>
    </div>
  );
}

export default Chatroom;
