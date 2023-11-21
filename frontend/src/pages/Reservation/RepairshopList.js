import { useNavigate } from "react-router";
import LargeButton from "../../components/Button";
import { useEffect, useState } from "react";
import ContentHeader from "../../components/ContentHeader";
import RepairshopComponent from "./RepairshopComponent";
import {
  readCarcenterList,
  readFavoriteCarcenter,
} from "../../service/reservation";
import styles from "./reservation.module.css";
import MainRepairshopComponent from "./MainRepairshopComponent";

//정비소 목록페이지
function RepairshopList() {

  const navigate = useNavigate();

  //주정비소 등록페이지로 이동
  const handleOnclick = () => {
    navigate("../mainrepairshop");
  };

  const [carcenterlist, setCarcenterList] = useState([]);
  const [favoriteCarcenterList, setFavoriteCarcenterList] = useState([]);

  //주정비소 출력
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await readFavoriteCarcenter();
        setFavoriteCarcenterList(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
    <div>
      <div>
        <ContentHeader menuName="정비소 목록" />
      </div>
      <div className={styles.RepairshopList}>
        <div className={styles.MainRepairshopComponent}>
          {favoriteCarcenterList.map((favoriteCarcenter) => (
            <MainRepairshopComponent
              key={favoriteCarcenter.carcenterId}
              favoriteCarcenter={favoriteCarcenter}
            />
          ))}
        </div>

        <div className={styles.LargeButton}>
          <LargeButton onClick={handleOnclick} style={{ marginTop: "30px" }}>
            주 정비소 등록하기
          </LargeButton>
        </div>

        <div className={styles.RepairshopComponent}>
          {carcenterlist.map((carcenter) => (
            <RepairshopComponent
              key={carcenter.id}
              carcenter={carcenter}
              useCardBodyFc={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RepairshopList;
