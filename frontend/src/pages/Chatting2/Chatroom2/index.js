import React, { useEffect, useState } from "react";
import style from "./chatroom2.module.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ChatBox2 from "./ChatBox2";
import LargeButton from "../../../components/Button/index";
import ChatPartnerProfile2 from "../components/ChatPartnerProfile2";
import { getChatroom } from "../../../service/chatting";

function Chatroom2(props) {
  // [고객과 정비소의 채팅방]
  // 정비소의 메세지는 우측 초록색 박스로 표현
  // 고객의 메세지는 좌측 회색 박스로 표현
  // 제목/내용/전송날짜/예약버튼/작성버튼을 포함.
  // 예약버튼의 경우 정비소가 글작성시 예약버튼 활성화를 누를 경우에만 생성된다.

  const [searchParams] = useSearchParams();
  let userId = searchParams.get("userId");
  let userName = searchParams.get("userName");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    const loadingChatroom = async () => {
      try {
        const response = await getChatroom(userId);
        setMessageList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadingChatroom();
  }
  , []);

  useEffect(() => {
    console.log(messageList);
  }, [messageList]);

  // const messageList = [
  //   {
  //     id: "1",
  //     chatting_id: "1",
  //     sender_id: "1",
  //     carcenter_id: null,
  //     sendDate: new Date().toLocaleDateString(),
  //     title: "고객:문의입니다.",
  //     content: "내용1입니다.",
  //     isReservation: "0",
  //     breakdown_id: "0",
  //     cardataId: 1
  //   },
  //   {
  //     id: "2",
  //     chatting_id: "1",
  //     sender_id: null,
  //     carcenter_id: "1",
  //     sendDate: new Date().toLocaleDateString(),
  //     title: "정비소:답변입니다.",
  //     content: "내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.",
  //     isReservation: "1",
  //     breakdown_id: "0",
  //     cardataId: null
  //   },
  //   {
  //     id: "3",
  //     chatting_id: "1",
  //     sender_id: null,
  //     carcenter_id: "1",
  //     sendDate: new Date().toLocaleDateString(),
  //     title: "정비소:답변입니다.",
  //     content: "내용2입니다.",
  //     isReservation: "0",
  //     breakdown_id: "0",
  //     cardataId: null
  //   },
  // ];

  const navigate = useNavigate(); // useNavigate 훅을 사용
  const moveWrite = () => {
    navigate(`/chatting2/writeform2?userId=${userId}&userName=${userName}`);
  };

  return (
    <div className={style.ChatroomWrap}>
      <ChatPartnerProfile2 userName={userName}></ChatPartnerProfile2>
      {messageList.map((message) =>
        message.memberId >= 100000 ? (
          <div className={style.ChatboxSenderWrap}>
            <ChatBox2
              title={message.title}
              content={message.content}
              sendDate={message.sendDate}
              isReservation={message.isReservation}
              // cardataId={message.cardataId} 정비소는 데이터 첨부 버튼 필요x
              issender="1"
            ></ChatBox2>
          </div>
        ) : (
          <div className={style.ChatboxWrap}>
            <ChatBox2
              title={message.title}
              content={message.content}
              sendDate={message.sendDate}
              // isReservation={message.isReservation} 고객은 예약 활성화 버튼 필요x
              cardataId={message.cardataId}
              issender="0"
            ></ChatBox2>
          </div>
        )
      )}
      <div className={style.SmallButtonWrap}>
        <LargeButton
          children="작성하기"
          onClick={() => moveWrite()}
        ></LargeButton>
      </div>
    </div>
  );
}

export default Chatroom2;
