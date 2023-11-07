import style from "./chattingList.module.css";
import ChatMemberBox from "./ChatMemberBox";
import { Link } from "react-router-dom";
import { useState } from "react";
import ContentHeader from "../../../components/ContentHeader";
import searchIcon from "../../../img/chatting/searchIcon.png";

function ChattingList() {
  // [고객 채팅목록 페이지]
  // 정비소 데이터 더미를 임시로 생성하였음.
  // 검색칸에 정비소명을 입력하면 실시간으로 필터링 됌.
  // 해당 지점을 클릭하면 채팅방으로 이동
  // *고객의 채팅목록 페이지는 모든 정비소를 다 보여준다.
  
  const carcenterList = [
    {
      id: "1",
      name: "서울점",
      withdrawal: "0",
    },
    {
      id: "2",
      name: "경기도점",
      withdrawal: "0",
    },
    {
      id: "3",
      name: "제주도점",
      withdrawal: "1",
    },
  ];

  // 검색어 상태 추가
  const [searchTerm, setSearchTerm] = useState("");

  // 검색어 입력 시 해당 검색어와 일치하는 사용자만 필터링
  const filteredUserList = carcenterList.filter((carcenterList) => {
    return (
      carcenterList.withdrawal === "0" &&
      carcenterList.name.includes(searchTerm)
    );
  });

  return (
    <div className={style.chattingWrap}>
      <div>
        <ContentHeader menuName="정비소 목록"></ContentHeader>
      </div>
      <div className={style.searchWrap}>
        <div className={style.searchImgWrap}>
          <img className={style.searchImg} src={searchIcon} alt="User" />
        </div>
        <div>
          <input
            className={style.searchInput}
            placeholder="정비소를 검색하세요."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className={style.ChatMemberBoxWrap}>
        {filteredUserList.map(
          (carcenter) =>
            carcenter.withdrawal === "0" && (
              <div key={carcenter.id}>
                <Link
                  to={`/chatting/chatroom/${carcenter.id}?carcenterName=${carcenter.name}`}
                  style={{ textDecoration: "none" }}
                >
                  <ChatMemberBox carcenterName={carcenter.name} />
                </Link>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default ChattingList;
