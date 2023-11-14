import styles from "./style.module.css";

function ImgRadio(props) {
  const { items, name, selected, setSelected } = props;

  const handleChange = (e) => {
    setSelected(parseInt(e.target.value));
  };

  return (
    <div className={styles.wrapper}>
      {items.map((item, idx) => (
        <label
          className={`${styles.option} ${
            selected === idx ? styles.checked : ""
          }`}
          key={idx}
        >
          <input
            type="radio"
            value={idx}
            name={name}
            className={styles.radioBtn}
            checked={selected === idx}
            onChange={handleChange}
          />
          <div className={styles.content}>
            <div className={styles.image}>
              <img src={`data:image/png;base64,${item.logo}`} alt={item.name} />
            </div>
            <div className={styles.text}>{item.name}</div>
          </div>
        </label>
      ))}
    </div>
  );
}

export default ImgRadio;
