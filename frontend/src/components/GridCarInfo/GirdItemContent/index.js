// import
import React from "react";
import NumberFormat from "react-number-format";
import styles from "./style.module.css";
import happy from "../../../img/icon/happy.png";
import sad from "../../../img/icon/sad.png";

// GirdItemContent Component
// Props : tag(객체의 key값), value(객체의 value), style(추가적으로 적용하고 싶은 css)
function GirdItemContent(props) {
  const { tag, value, style } = props;

  // 출력할 content
  let content = value;

  // value의 type에 따라 다른 content 생성
  const setContent = () => {
    if (typeof value === "boolean") {
      // type이 boolean 이면 아이콘
      content = (
        <img
          className={styles.image}
          src={value ? happy : sad}
          alt={value ? happy : sad}
        />
      );
      return value ? 2 : 3;
    } else {
      // type이 숫자면 숫자와 tag에 따른 단위 표시
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
      <div className={styles.value} style={style}>
        {content}
      </div>
    </div>
  );
}

// Component 최적화, Props 값의 변화에 따른 리랜더링 방지
export default React.memo(GirdItemContent);
