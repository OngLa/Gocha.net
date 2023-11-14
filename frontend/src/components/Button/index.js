import styles from "./style.module.css";

function LargeButton(props) {
  const { name, onClick, children, style } = props;

  return (
    <button
      className={`${styles.btn} ${styles.largeBtn}`}
      name={name}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
}

export default LargeButton;

function SmallButton(props) {
  const { name, onClick, children, style } = props;

  return (
    <button
      className={`${styles.btn} ${styles.smallBtn}`}
      name={name}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
}

function SmallButton2(props) {
  const { name, onClick, children, style } = props;

  return (
    <button
      className={`${styles.btn2} ${styles.smallBtn2}`}
      name={name}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
}

export { SmallButton, SmallButton2 };
