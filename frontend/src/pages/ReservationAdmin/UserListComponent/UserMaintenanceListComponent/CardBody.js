import styles from "./userwaitlistcomponent.module.css"
import { SmallButton } from "../../../../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router";


function CardBody (props){
  
  const[state,setState]=useState();
  //false는 승인대기 ture는 정비중
  const toggleApproveOnclick=()=>{
    console.log("상태변경완료!")
    setState(!state);
    navigate("../opinionpage");
  }
  
  const navigate = useNavigate();

const hadleDeleteOnclick=()=>{
  alert("삭제되었습니다.")
  //액시오스 딜리트 사용
}


  return(
    <div>
      <div className={styles.cardBody}>
        {/* 차종,에러코드,예약일자 프롭스 */}
  <h2>차종:{props.car_type_id}</h2>
  <h2>에러코드:{props.breakdown_id}</h2>
  <h2>예약일자:{props.reserved_date}</h2>
      </div>
  
       <div className={styles.button}>
          <SmallButton style={{marginRight:"10px"}} onClick={hadleDeleteOnclick}>예약취소</SmallButton>
          <SmallButton onClick={toggleApproveOnclick}>정비완료</SmallButton>
       </div>
    </div>
  );
}
export default CardBody;