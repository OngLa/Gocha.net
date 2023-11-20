import { useEffect, useState } from "react";
import ContentHeader from "../../components/ContentHeader";
import MainRepairshopComponent from "./MainRepairshopComponent";
import { readCarcenterList } from "../../service/reservation";
import styles from "./reservation.module.css";

function MainRepairshop() {
  //주 정비소 등록하기 페이지
  const [carcenterlist, setCarcenterList] = useState([]);

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
  //정비소 목록 서버에서 가져오는 api
  
  return (
    <div className="MainRepairshop">
     <ContentHeader menuName="주 정비소 등록하기"/>

     <div className={styles.RepairshopComponent}>
          {carcenterlist.map((carcenter) => (
            <MainRepairshopComponent key={carcenter.id} carcenter={carcenter} />
          ))}
        </div>
    </div>
  );
}
export default MainRepairshop;
