import { useNavigate } from "react-router-dom";
import { SmallButton } from "../../../../components/Button";
import styles from "./userwaitlistcomponent.module.css"


function CardBody ({list}){

  const navigate=useNavigate();
  const handleStateChange=()=>{};
const hadleDeleteOnclick=()=>{
  navigate("refusepage", { state: { list } })
}


  return(
    <div className={styles.cardBody}>
      {/* 차종,에러코드,예약일자 프롭스 */}
{/* <h2>차종:{list.car_type_id}</h2> */}
{/* <h2>에러코드:{list.breakdown_id}</h2> */}
<h2>예약일자:{list.reservedDate}</h2>
{/* <h2>전화번호:{list.phone_number}</h2> */}

<div className={styles.button}>
          <SmallButton onClick={handleStateChange}>예약승인</SmallButton>
          <SmallButton onClick={hadleDeleteOnclick}>예약거절</SmallButton>
       </div>
    </div>
  );
}
export default CardBody;