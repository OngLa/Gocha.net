import React, { useEffect, useState } from "react";
import style from "./chatroom.module.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ChatBox from "./ChatBox";
import LargeButton from "../../../components/Button/index";
import ChatPartnerProfile from "../components/ChatPartnerProfile";
import { getChatroom } from "../../../apis/chatting";

// /chatting/chatroom?carcenterId=${carcenter.id}&carcenterName=${carcenter.name}`
function Chatroom(props) {
  // [고객과 정비소의 채팅방]
  // 고객의 메세지는 우측 초록색 박스로 표현
  // 정비소의 메세지는 좌측 회색 박스로 표현
  // 제목/내용/전송날짜/예약버튼/작성버튼을 포함.
  // 예약버튼의 경우 정비소가 글작성시 예약버튼 활성화를 누를 경우에만 생성된다.

  const [searchParams] = useSearchParams();
  let carcenterId = searchParams.get("carcenterId");
  let carcenterName = searchParams.get("carcenterName");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    const loadingChatroom = async () => {
      try {
        const response = await getChatroom(carcenterId);
        console.log(response.data);
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


//   [
//     {
//         "id": 1,
//         "memberId": "10",
//         "sendDate": "2023-11-15T03:33:33.000+00:00",
//         "title": "고객:문의요",
//         "content": "고객 문의 내용입니다.",
//         "isReservation": false,
//         "cardataId": null
//     },
//     {
//         "id": 2,
//         "memberId": "100002",
//         "sendDate": "2023-11-15T03:36:33.000+00:00",
//         "title": "정비소:답변이요",
//         "content": "정비소 답변 내용입니다.",
//         "isReservation": true,
//         "cardataId": null
//     }
// ]

  // const messageList = [
  //   {
  //     id: "1",
  //     chatting_id: "1",
  //     member_id: 10,
  //     send_date: new Date().toLocaleDateString(),
  //     title: "고객:문의입니다.",
  //     content: "내용1입니다.",
  //     is_reservation: "0",
  //     breakdown_id: "0",
  //     cardata_id: "1"
  //   },
  //   {
  //     id: "2",
  //     chatting_id: "100002",
  //     member_id: null,
  //     send_date: new Date().toLocaleDateString(),
  //     title: "정비소:답변입니다.",
  //     content: "내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.내용2입니다.",
  //     is_reservation: "1",
  //     breakdown_id: "0",
  //     cardata_id: null
  //   },
  //   {
  //     id: "3",
  //     chatting_id: "1",
  //     member_id: "100002",
  //     send_date: new Date().toLocaleDateString(),
  //     title: "정비소:답변입니다.",
  //     content: "내용3입니다.",
  //     is_reservation: "1",
  //     breakdown_id: "0",
  //     cardata_id: null
  //   },
  // ];

  const navigate = useNavigate(); // useNavigate 훅을 사용
  const moveWrite = () => {
    navigate(`/chatting/writeform?carcenterId=${carcenterId}&carcenterName=${carcenterName}`);
  };

  return (
    <div className={style.ChatroomWrap}>
      <ChatPartnerProfile carcenterName={carcenterName}></ChatPartnerProfile>
      {messageList.map((message) =>
        message.memberId < 100000 ? (
          <div className={style.ChatboxSenderWrap}>
            <ChatBox
              title={message.title}
              content={message.content}
              send_date={message.send_date}
              // is_reservation={message.is_reservation} 고객은 예약 활성화 버튼 필요x
              cardata_id={message.cardata_id}
              issender="1"
            ></ChatBox>
          </div>
        ) : (
          <div className={style.ChatboxWrap}>
            <ChatBox
              title={message.title}
              content={message.content}
              send_date={message.send_date}
              is_reservation={message.is_reservation}
              // cardata_id={message.cardata_id} 정비소는 데이터 첨부 버튼 필요x
              issender="0"
            ></ChatBox>
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

export default Chatroom;
