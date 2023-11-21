import { useNavigate } from "react-router";
import LargeButton from "../../components/Button";
import { useEffect, useState } from "react";
import ContentHeader from "../../components/ContentHeader";
import RepairshopComponent from "./RepairshopComponent";
import { readCarcenterList } from "../../service/reservation";
import styles from "./reservation.module.css";
import searchIcon from "../../img/chatting/searchIcon.png";
import { useSearchParams } from "react-router-dom";

function RepairshopList() {
  //정비소 목록페이지

  const navigate = useNavigate();
  const handleOnclick = () => {
    navigate("../mainrepairshop");
  };
  //주정비소 등록페이지로 이동

  const [carcenterlist, setCarcenterList] = useState([]);

  useEffect(() => {
    const carcenters = async () => {
      try {
        //정비소 목록 서버에서 가져오는 api
        const response = await readCarcenterList();
        setCarcenterList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    carcenters();
  }, [carcenterlist]);


  // 비대면 진단 채팅방에서 예약하기를 누르면 navigate로 이동하면서 carcenterName을 받아옴.
  // 이를 검색어 상태의 초기값으로 세팅하여 바로 예약할 수 있도록한다.
  const [searchParams] = useSearchParams();
  let carcenterName = searchParams.get("carcenterName");

  // 검색어 상태 추가
  const [searchTerm, setSearchTerm] = useState(carcenterName || "");

  // 검색어 입력 시 해당 검색어와 일치하는 사용자만 필터링
  const filteredUserList = carcenterlist.filter((carcenter) => {
    return carcenter.name.includes(searchTerm);
  });

  return (
    <div>
      <div>
        <ContentHeader menuName="정비소 목록" />
      </div>
      <div className={styles.RepairshopList}>
        <div className={styles.LargeButton}>
          <LargeButton onClick={handleOnclick} style={{ marginTop: "30px" }}>
            주 정비소 등록하기
          </LargeButton>
        </div>
        <div className={styles.searchWrap}>
          <div className={styles.searchImgWrap}>
            <img className={styles.searchImg} src={searchIcon} alt="User" />
          </div>
          <div>
            <input
              className={styles.searchInput}
              placeholder="정비소를 검색하세요."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.RepairshopComponent}>
          {filteredUserList.map((carcenter) => (
            <RepairshopComponent key={carcenter.id} carcenter={carcenter} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RepairshopList;
