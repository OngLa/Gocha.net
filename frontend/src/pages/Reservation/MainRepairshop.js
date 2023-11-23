import { useEffect, useState } from "react";
import ContentHeader from "../../components/ContentHeader";
import { readCarcenterList } from "../../service/reservation";
import styles from "./reservation.module.css";
import RepairshopComponent from "./RepairshopComponent";
import searchIcon from "../../img/chatting/searchIcon.png";

//주 정비소 등록하기 페이지
function MainRepairshop() {
  const [carcenterlist, setCarcenterList] = useState([]);

  //정비소 출력
  useEffect(() => {
    const carcenters = async () => {
      try {
        const response = await readCarcenterList();
        setCarcenterList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    carcenters();
  }, []);

    // 검색어 상태 추가
    const [searchTerm, setSearchTerm] = useState("");

    // 검색어 입력 시 해당 검색어와 일치하는 사용자만 필터링
    const filteredList = carcenterlist.filter((carcenter) => {
      return carcenter.name.includes(searchTerm);
    });
  
  return (
    <div className="MainRepairshop">
     <ContentHeader menuName="주 정비소 등록하기"/>
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
          {filteredList.map((carcenter) => (
            <RepairshopComponent key={carcenter.id} carcenter={carcenter} useCardBodyFc={true}/>
          ))}
        </div>
    </div>
  );
}
export default MainRepairshop;
