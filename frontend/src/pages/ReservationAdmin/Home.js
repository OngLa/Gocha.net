import { useEffect, useState } from "react";
import ContentHeader from "../../components/ContentHeader";
import styles from "./reservationAdmin.module.css";
import { readReservationUserList } from "../../service/reservation";
import UserListComponent from "./UserListComponent";
import imgMoveBottom from "../../img/icon/Caret_Down_MD.png";
import imgMoveTop from "../../img/icon/Caret_Up_MD.png";
import { SmallButton, SmallButton2 } from "../../components/Button";
import Loading from "../Loading";

function Home() {
  // ================================================================//
  //예약자 목록 출력
  const [isLoading, setIsLoading] = useState(true);
  const [userlist, setUserlist] = useState([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await readReservationUserList();
      setUserlist(response.data);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching user list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect 리랜더링 함수
  const refreshList = () => {
    fetchData();
  };
  // ================================================================//
  //랜더링 화면위치, 스크롤 로직

  // 화면 로딩 시 최하단 화면으로 시작
  // function scrollToBottom() {
  //   window.scrollTo(0, document.body.scrollHeight); // 수직 스크롤을 문서의 높이로 이동
  // }

  // useEffect(() => {
  //   scrollToBottom();
  // }, [userlist]);

  //스크롤 로직
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
  // ================================================================//
  //필터

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchName, setSearchName] = useState("");
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");

  // 필터 초기화 함수
  const resetFilters = () => {
    setStartDate("");
    setEndDate("");
    setSearchName("");
    setStatusFilter("");
  };

  useEffect(() => {
    let filtered = userlist;

    // 이름으로 필터링
    if (searchName) {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    // 날짜로 필터링
    if (startDate && endDate) {
      filtered = filtered.filter((user) => {
        const reservedDate = new Date(user.reservedDate).getTime();
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();
        return reservedDate >= start && reservedDate <= end;
      });
    }

    // 셀렉트 박스 값을 기반으로 상태 필터링
    if (statusFilter !== "") {
      filtered = filtered.filter(
        (user) => user.state.toString() === statusFilter
      );
    }

    setFilteredUserList(filtered);
  }, [userlist, startDate, endDate, searchName, statusFilter]);

  // ============================================================================================================//
  //JSX시작

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ContentHeader menuName="예약관리" />
          {/* ================================================================ */}
          {/* 필터 컴포넌트 */}
          <div className={styles.filterContainer}>
            <div className={styles.box1}>
              <select
                className={styles.statusFilter}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">전체</option>
                <option value="0">승인대기중</option>
                <option value="1">승인됨</option>
                <option value="2">정비완료</option>
                <option value="3">취소됨</option>
              </select>

              <input
                type="text"
                placeholder="검색 이름"
                className={styles.searchInput}
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </div>

            <div className={styles.dateInputs}>
              <input
                type="date"
                placeholder="시작 날짜"
                className={styles.dateInput}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="date"
                placeholder="종료 날짜"
                className={styles.dateInput}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className={styles.fileterButton}>
              <SmallButton onClick={refreshList}>필터 적용</SmallButton>
              <SmallButton2 onClick={resetFilters}>필터 초기화</SmallButton2>
            </div>
          </div>

          {/* ================================================================ */}
          {/* 예약 컴포넌트 출력 */}

          <div>
            {filteredUserList.map((list) => (
              <UserListComponent
                key={list.id}
                list={list}
                refreshList={refreshList}
              />
            ))}
          </div>
          {/* ================================================================ */}
          {/* 스크롤 로직 */}

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
          {/* ================================================================ */}
        </>
      )}
    </div>
  );
}
export default Home;
