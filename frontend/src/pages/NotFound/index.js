import NotFoundImg from "../../img/not_found.png";
import styles from "./style.module.css";

// Not Found 페이지
function NotFound(props) {

  // not found 에 대한 설명
  const {message} = props;

  return (
    <div className={styles.wrapper}>
      <div className={styles.imgWrapper}>
        <img src={NotFoundImg} alt="NOT_FOUND"/>
      </div>
      <div className={styles.msg}>
        {message}
      </div>
    </div>
  );
}

export default NotFound;
