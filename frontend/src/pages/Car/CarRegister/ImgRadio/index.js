import styles from "./style.module.css";

function ImgRadio(props) {
  const { items, name, selected, setSelected } = props;

  const handleChange = (e) => {
    setSelected(parseInt(e.target.value));
  };

  return (
    <div className={styles.wrapper}>
      {items.map((item) => (
        <label
          className={`${styles.option} ${
            selected === item.id ? styles.checked : ""
          }`}
          key={item.id}
        >
          <input
            type="radio"
            value={item.id}
            name={name}
            className={styles.radioBtn}
            checked={selected === item.id}
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
