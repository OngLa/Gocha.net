import { useNavigate } from "react-router-dom";
import { SmallButton } from "../../../../components/Button";
import styles from "./userwaitlistcomponent.module.css";
import { updateState } from "../../../../service/reservation";

function CardBody({ list }) {

  const navigate = useNavigate();
  const hadleDeleteOnclick = () => {
    navigate("refusepage", { state: { list } });
  };

  //진행상태변경
const handleUpdateClick = async (reservationId) =>{
  try{
const response =await updateState(); 
  }catch(error){
console.log(error);
  }
}

  return (
    <div className={styles.cardBody}>
      <div className={styles.h2}>
        <h2>에러코드:{list.carDataId}</h2>
        <h2>예약일자:{list.reservedDate}</h2>
        <h2>전화번호:{list.phoneNumber}</h2>
      </div>

      <div className={styles.button}>
        <SmallButton  onClick={() => handleUpdateClick(list.reservationId)}>예약승인</SmallButton>
        <SmallButton onClick={hadleDeleteOnclick}>예약거절</SmallButton>
      </div>
    </div>
  );
}
export default CardBody;
