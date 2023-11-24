import { useEffect, useState } from "react";
import ContentHeader from "../../components/ContentHeader";
import styles from "./reservationAdmin.module.css";
import { readReservationUserList } from "../../service/reservation";
import UserListComponent from "./UserListComponent";
import imgMoveBottom from "../../img/icon/Caret_Down_MD.png";
import imgMoveTop from "../../img/icon/Caret_Up_MD.png";

function Home() {
  const [userlist, setUserlist] = useState([]);

  //예약자 목록 출력
  const fetchData = async () => {
    try {
      const response = await readReservationUserList();
      setUserlist(response.data);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  // 화면 로딩 시 최하단 화면으로 시작
  function scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight); // 수직 스크롤을 문서의 높이로 이동
  }

  useEffect(() => {
    scrollToBottom();
  }, [userlist]);

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect 리랜더링 함수
  const refreshList = () => {
    fetchData();
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
    <div>
      <ContentHeader menuName="예약관리" />
      <div>
        {userlist.map((list) => (
          <UserListComponent
            key={list.id}
            list={list}
            refreshList={refreshList}
          />
        ))}
      </div>
      <img
        src={imgMoveTop}
        alt="scroll"
        className={styles.scrollToTop}
        onClick={moveToTop}
      />
      <img
        src={imgMoveBottom}
        alt="scroll"
        className={styles.scrollToBottom}
        onClick={moveToBottom}
      />
    </div>
  );
}
export default Home;
