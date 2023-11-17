import styles from "./style.module.css";

function CustomSelect(props) {
  const { items, value, setValue } = props;

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
              {item.carName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default CustomSelect;

// [
//   {
//     "carId": 0,
//     "carName": "string",
//     "logo": [
//       "string"
//     ],
//     "photo": "string"
//   }
// ]
