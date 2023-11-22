import styles from "./style.module.css";
import upIocn from "../../../../img/icon/Caret_Up_MD.png";
import downIocn from "../../../../img/icon/Caret_Down_MD.png";

const ToggleList = (props) => {
  // title 내용, content 내용
  // toggle에 대한 상태변수
  const { title_children, content_children, toggle, setToggle } = props;

  const toggleContent = () => {
    setToggle(!toggle);
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.btn} onClick={toggleContent}>
        <div className={styles.title}>{title_children}</div>
        <img
          className={styles.image}
          src={`${toggle ? upIocn : downIocn}`}
          alt="toggle-icon"
        />
      </button>
      <div
        className={`${styles.content} ${
          toggle ? styles.active : styles.nonActive
        }`}
      >
        {content_children}
      </div>
    </div>
  );
};

export default ToggleList;
