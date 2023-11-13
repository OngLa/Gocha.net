import styles from "./userwaitlistcomponent.module.css"

function CardBody (props){
  
  return(
    <div className={styles.cardBody}>
      {/* 차종,에러코드,예약일자 프롭스 */}
<h2>차종:{props.car_type_id}</h2>
<h2>에러코드:{props.breakdown_id}</h2>
<h2>예약일자:{props.reserved_date}</h2>
<h2>전화번호:{props.phone_number}</h2>


    </div>
  );
}
export default CardBody;