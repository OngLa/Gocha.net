import styles from "./MainRepairshopComponent.module.css"


function CardHead({name}) {


  //액시오스로 데이터 받아옴 {id: ""}
  return(
  <div className={styles.cardHead}>

<div className={styles.imgWrap}>
        <img
          src={`https://source.boringavatars.com/sunset/${name}?colors=F26B7A,F0F2DC,D9EB52,8AC7DE,87796F`}
          alt="User"
        />
        {name}
      </div>


  </div>
);
}
export default CardHead;