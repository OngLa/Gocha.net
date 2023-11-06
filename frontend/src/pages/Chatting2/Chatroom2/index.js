import React from "react";
import style from "./chatroom2.module.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ChatBox2 from "./ChatBox2";
import { SmallButton } from "../../../components/Button/index";
import ChatPartnerProfile2 from "../components/ChatPartnerProfile2";

function Chatroom2(props) {
  const uno = parseInt(useParams().uno);
  const [searchParams] = useSearchParams();
  let userName = searchParams.get("userName");

  const messageList = [
    {
      id: "1",
      chatting_id: "2",
      sender_id: "1",
      carcenter_id: null,
      send_date: new Date().toLocaleDateString(),
      title: "정비소:답변입니다.",
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
      title: "고객:문의입니다.",
      contents: "내용2입니다.",
      is_reservation: "1",
      breakdown_id: "0",
    },
  ];

  const navigate = useNavigate(); // useNavigate 훅을 사용
  const moveWrite = (uno) => {
    navigate(`/chatting2/writeform2/${uno}?userName=${userName}`);
  };

  return (
    <div className={style.ChatroomWrap}>
      <div className={style.ChatPartnerProfileWrap}>
        <ChatPartnerProfile2 userName={userName}></ChatPartnerProfile2>
      </div>
      {messageList.map((message) =>
        message.carcenter_id !== null ? (
          <div className={style.ChatboxSenderWrap}>
            <ChatBox2
              title={message.title}
              contents={message.contents}
              send_date={message.send_date}
              is_reservation={message.is_reservation}
              issender="1"
            ></ChatBox2>
          </div>
        ) : (
          <div className={style.ChatboxWrap}>
            <ChatBox2
              title={message.title}
              contents={message.contents}
              send_date={message.send_date}
              issender="0"
            ></ChatBox2>
          </div>
        )
      )}
      <div className={style.SmallButtonWrap}>
        <SmallButton
          children="작성하기"
          onClick={() => moveWrite(uno)}
        ></SmallButton>
      </div>
    </div>
  );
}

export default Chatroom2;
