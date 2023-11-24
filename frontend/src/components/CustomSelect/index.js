// import
import React from "react";
import styles from "./style.module.css";

// CustomSelect Component
// Props : items(출력할 List), value(Selector의 선택한 값의 상태), setValue(상태 처리 함수)
function CustomSelect(props) {
  const { items, value, setValue } = props;

  // selector 선택 시 호출되는 이벤트 헨들러 -> 선택된 값에 따른 value 상태 변경
  const handleValue = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.tagName}>내 차종</div>
      <div className={styles.customSelect}>
        <select value={value} onChange={handleValue}>
          {items.map((item, idx) => (
            <option key={idx} value={idx}>
              {`${item.carName}(${item.carNumber})`}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

// Component 최적화, Props 값의 변화에 따른 리랜더링 방지
export default React.memo(CustomSelect);
