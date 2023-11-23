import styles from "./style.module.css";
import spinner from "../../img/Spinner.gif";

// 로딩 페이지
function Loading() {
  return (
    <div className={styles.wrapper}>
      <div>
        {/* spinner 이미지 */}
        <img src={spinner} alt="loading" />
      </div>
      <div className={styles.loadingText}>잠시만 기다려 주세요.</div>
    </div>
  );
}

export default Loading;
