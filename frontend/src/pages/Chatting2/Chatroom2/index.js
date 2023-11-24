import React, { useEffect, useState } from "react";
import style from "./chatroom2.module.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ChatBox2 from "./ChatBox2";
import LargeButton from "../../../components/Button/index";
import ChatPartnerProfile2 from "../components/ChatPartnerProfile2";
import { getChatroom } from "../../../service/chatting";
import imgMoveBottom from "../../../img/icon/Caret_Down_MD.png";
import imgMoveTop from "../../../img/icon/Caret_Up_MD.png";

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
        // (해당 유저와의) 채팅방 메세지 조회
        const response = await getChatroom(userId);
        setMessageList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadingChatroom();
  }, []);

    // 화면 로딩 시 최하단 화면으로 시작
    function scrollToBottom() {
      window.scrollTo(0, document.body.scrollHeight); // 수직 스크롤을 문서의 높이로 이동
    }
  
    useEffect(() => {
      scrollToBottom();
    }, [messageList]);

  // 데이터 확인
  // useEffect(() => {
  //   console.log(messageList);
  // }, [messageList]);

  // 예제 데이터
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

  // 작성 Form으로 이동
  const navigate = useNavigate(); // useNavigate 훅을 사용
  const moveWrite = () => {
    navigate(`/chatting2/writeform2?userId=${userId}&userName=${userName}`);
  };
  
  function moveToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  function moveToBottom() {
    window.scroll({
      top: document.body.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className={style.ChatroomWrap}>
      <ChatPartnerProfile2 userName={userName}></ChatPartnerProfile2>
      {messageList.map((message) =>
        // 현재는 카센터페이지이기에 memberId가 100000보다 크면 내가 보낸 메세지로 보이기 위해 우측 정렬한다.(isSender로 자기 메세지 구분)
        message.memberId >= 100000 ? (
          // 정비소
          <div className={style.ChatboxSenderWrap} key={message.id}>
            {/* ChatBox는 메세지가 보여지는 box단위이다. sender가 1이면 우측정렬로 초록색으로표시됨 */}
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
          // 고객
          <div className={style.ChatboxWrap}  key={message.id}>
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
      <div className={style.largeButtonWrap}>
        <LargeButton
          children="작성하기"
          onClick={() => moveWrite()}
        ></LargeButton>
      </div>
      <img
        src={imgMoveTop}
        alt="scroll"
        className={style.scrollToTop}
        onClick={moveToTop}
      />
      <img
        src={imgMoveBottom}
        alt="scroll"
        className={style.scrollToBottom}
        onClick={moveToBottom}
      />
    </div>
  );
}

export default Chatroom2;
