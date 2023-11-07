import styles from './style.module.css'

function CustomSelect(props) {

  const {items, value, setValue} = props;

  const handleValue = (e) => {
    setValue(e.target.value);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.tagName}>내 차종</div>
      <div className={styles.customSelect}>
        <select value={value} onChange={handleValue} >
          {items.map((item) => (
            <option key={item.value} value={item.value}>{item.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default CustomSelect;
