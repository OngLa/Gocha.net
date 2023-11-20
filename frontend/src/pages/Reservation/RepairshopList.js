import { useNavigate } from "react-router";
import LargeButton from "../../components/Button";
import { useEffect, useState } from "react";
import ContentHeader from "../../components/ContentHeader";
import RepairshopComponent from "./RepairshopComponent";
import { readCarcenterList } from "../../service/reservation";
import styles from "./reservation.module.css";

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
        const response = await readCarcenterList();
        setCarcenterList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    carcenters();
  }, [carcenterlist]);
  //정비소 목록 서버에서 가져오는 api
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
        <div className={styles.RepairshopComponent}>
          {carcenterlist.map((carcenter) => (
            <RepairshopComponent key={carcenter.id} carcenter={carcenter} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RepairshopList;
