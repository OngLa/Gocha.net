import { useEffect, useState } from "react";
import ContentHeader from "../../components/ContentHeader";
import { readCarcenterList } from "../../service/reservation";
import styles from "./reservation.module.css";
import RepairshopComponent from "./RepairshopComponent";

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
  
  return (
    <div className="MainRepairshop">
     <ContentHeader menuName="주 정비소 등록하기"/>

     <div className={styles.RepairshopComponent}>
          {carcenterlist.map((carcenter) => (
            <RepairshopComponent key={carcenter.id} carcenter={carcenter} useCardBodyFc={true}/>
          ))}
        </div>
    </div>
  );
}
export default MainRepairshop;
