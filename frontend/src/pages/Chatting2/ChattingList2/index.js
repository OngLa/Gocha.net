import React, { useState } from "react";
import style from "./chattingList2.module.css";
import ChatMemberBox2 from "./ChatMemberBox2";
import { Link } from "react-router-dom";
import ContentHeader from "../../../components/ContentHeader";
import searchIcon from "../../../img/chatting/searchIcon.png";

function ChattingList2() {
  // [정비소 채팅목록 페이지]
  // 고객 데이터 더미를 임시로 생성하였음.
  // 검색칸에 고객명을 입력하면 실시간으로 필터링 됌.
  // 해당 고객을 클릭하면 채팅방으로 이동
  // *정비소는 자신에게 메시지를 보낸 기록이 있는 채팅방만 표시한다.
  // (고객의 채팅목록 페이지는 모든 정비소를 다 보여준다.)

  const userList = [
    {
      id: "1",
      nickname: "김지선",
      withdrawal: "0",
    },
    {
      id: "2",
      nickname: "윤시호",
      withdrawal: "0",
    },
    {
      id: "3",
      nickname: "하재민",
      withdrawal: "0",
    },
    {
      id: "4",
      nickname: "홍석호",
      withdrawal: "1",
    },
  ];

  // 검색어 상태 추가
  const [searchTerm, setSearchTerm] = useState("");

  // 검색어 입력 시 해당 검색어와 일치하는 사용자만 필터링
  const filteredUserList = userList.filter((user) => {
    return user.withdrawal === "0" && user.nickname.includes(searchTerm);
  });

  return (
    <div className={style.chattingWrap}>
      <div>
        <ContentHeader menuName="고객 목록"></ContentHeader>
      </div>
      <div className={style.searchWrap}>
        <div className={style.searchImgWrap}>
          <img className={style.searchImg} src={searchIcon} alt="User" />
        </div>
        <div>
          <input
            className={style.searchInput}
            placeholder="고객을 검색하세요."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className={style.ChatMemberBoxWrap}>
        {filteredUserList.map(
          (user) =>
            user.withdrawal === "0" && (
              <div key={user.id}>
                <Link
                  to={`/chatting2/chatroom2/${user.id}?userName=${user.nickname}`}
                  style={{ textDecoration: "none" }}
                >
                  <ChatMemberBox2 userName={user.nickname} />
                </Link>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default ChattingList2;
