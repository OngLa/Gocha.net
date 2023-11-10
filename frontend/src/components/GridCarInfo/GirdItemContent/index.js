import NumberFormat from "react-number-format";

import styles from "./style.module.css";

import happy from "../../../img/icon/happy.png";
import sad from "../../../img/icon/sad.png";

function GirdItemContent(props) {
  const { tag, value, style } = props;

  let content = value;
  const setContent = () => {
    if (typeof value === "boolean") {
      content = (
        <img
          className={styles.image}
          src={value ? happy : sad}
          alt={value ? happy : sad}
        />
      );
      return value ? 2 : 3;
    } else {
      content = (
        <NumberFormat
          value={value}
          displayType={"text"}
          thousandSeparator={true}
          suffix={tag === "배터리 잔량" ? " %" : " km"}
        />
      );
      return 1;
    }
  };

  return (
    <div
      className={`${styles.wrapper} ${
        setContent() === 3 ? styles.backRed : ""
      }`}
    >
      <div className={styles.tag}>{tag}</div>
      <div className={styles.value} style={style}>{content}</div>
    </div>
  );
}

export default GirdItemContent;
