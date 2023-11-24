import style from "./chattingList.module.css";
import ChatMemberBox from "./ChatMemberBox";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ContentHeader from "../../../components/ContentHeader";
import searchIcon from "../../../img/chatting/searchIcon.png";
import { getChattingCarcenter } from "../../../service/chatting";
import Swal from "sweetalert2";

function ChattingList() {
  // [고객 채팅목록 페이지]
  // 검색칸에 정비소명을 입력하면 실시간으로 필터링 됌.
  // 해당 지점을 클릭하면 채팅방으로 이동
  // *고객의 채팅목록 페이지는 모든 정비소를 다 보여준다.

  const [carcenterList, setCarcenterList] = useState([]);

  useEffect(() => {
    const lodingChatting = async () => {
      try {
        const response = await getChattingCarcenter();
        setCarcenterList(response.data);
      } catch (error) {
        console.log(error);
        Swal.fire({
          background: "#334E58",
          color: "#FFDA47",
          width: "80vw",
          confirmButtonColor: "#45CB85",
  
          text: error.message,
          icon: "warning",
          confirmButtonText: "확인",
        });
      }
    };
    lodingChatting();
  }, []);

  // 예제 데이터
  // const carcenterList = [
  //   {
  //     id: "1",
  //     name: "서울점",
  //   },
  //   {
  //     id: "2",
  //     name: "경기도점",
  //   },
  //   {
  //     id: "3",
  //     name: "제주도점",
  //   },
  // ];

  // 검색어 상태 추가
  const [searchTerm, setSearchTerm] = useState("");

  // 검색어 입력 시 해당 검색어와 일치하는 사용자만 필터링
  const filteredUserList = carcenterList.filter((carcenter) => {
    return carcenter.name.includes(searchTerm);
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
        {filteredUserList.map((carcenter) => (
          <div key={carcenter.id}>
            {/* 멤버가 보여지는 Box */}
            <Link
              to={`/chatting/chatroominfo?carcenterId=${carcenter.id}&carcenterName=${carcenter.name}`}
              style={{ textDecoration: "none" }}
            >
              <ChatMemberBox carcenterName={carcenter.name} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChattingList;
