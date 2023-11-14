import styles from "./userwaitlistcomponent.module.css";
import { SmallButton } from "../../../../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router";

function CardBody(props) {
  const [state, setState] = useState();
  //false는 승인대기 ture는 정비중
  const toggleApproveOnclick = () => {
    alert("Post로 데이터 넘김!");
    setState(!state);
  };

  const navigate = useNavigate();

  const hanleRefusedOnclick = () => {
    console.log("거절되었습니다.");
    navigate("../refusepage");
  };

  return (
    <div>
      <div className={styles.cardBody}>
        {/* 차종,에러코드,예약일자 프롭스 */}
        <h2>차종:{props.car_type_id}</h2>
        <h2>에러코드:{props.breakdown_id}</h2>
        <h2>예약일자:{props.reserved_date}</h2>
        <h2>전화번호:{props.phone_number}</h2>
      </div>

      <div className={styles.button}>
        <SmallButton style={{marginRight:"10px"}} onClick={toggleApproveOnclick}>예약승인</SmallButton>
        <SmallButton onClick={hanleRefusedOnclick}>예약거절</SmallButton>
      </div>
    </div>
  );
}
export default CardBody;
