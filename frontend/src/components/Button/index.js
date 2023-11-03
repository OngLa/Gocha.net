import style from "./style.module.css";

function LargeButton(props) {
  const { name, onClick, children } = props;

  return (
    <button
      className={`${style.btn} ${style.largeBtn}`}
      name={name}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default LargeButton;

function SmallButton(props) {
  const { name, onClick, children } = props;

  return (
    <button
      className={`${style.btn} ${style.smallBtn}`}
      name={name}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export { SmallButton };