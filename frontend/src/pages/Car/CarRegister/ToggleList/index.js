import { forwardRef, useImperativeHandle, useState } from "react";
import styles from "./style.module.css";

const ToggleList = forwardRef((props, ref) => {
  const { title_children, content_children, initActive } = props;

  const [isActive, setIsActive] = useState(initActive);

  const toggleContent = () => {
    setIsActive(!isActive);
  };

  useImperativeHandle(ref, () => ({
    toggleIsActive: () => {
      setIsActive(!isActive);
    },
    getIsActive: () => {
      return isActive;
    }
  }));

  return (
    <div className={styles.wrapper}>
      <button className={styles.btn} onClick={toggleContent}>
        <div className={styles.title}>{title_children}</div>
        <img
          className={styles.image}
          src={`${
            isActive ? "/icon/Caret_Up_MD.png" : "/icon/Caret_Down_MD.png"
          }`}
          alt="toggle-icon"
        />
      </button>
      <div
        className={`${styles.content} ${
          isActive ? styles.active : styles.nonActive
        }`}
      >
        {content_children}
      </div>
    </div>
  );
});

export default ToggleList;
