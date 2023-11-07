import styles from './style.module.css'

function MycarInfo(props) {

  const {item} = props;

  return (
    <div className={styles.wrapper}>
      <div className={styles.tag}>
        <div className={styles.mb}>주행거리</div>
        <div className={styles.mb}>타이어 상태</div>
        <div className={styles.mb}>배터리 잔량</div>
        <div className={styles.mb}>충전 상태</div>
        <div className={styles.mb}>브레이크 오일</div>
        <div className={styles.mb}>엔진 오일</div>
        <div className={styles.mb}>워셔액</div>
      </div>
      <div className={styles.between}>
        <div className={styles.mb}>:</div>
        <div className={styles.mb}>:</div>
        <div className={styles.mb}>:</div>
        <div className={styles.mb}>:</div>
        <div className={styles.mb}>:</div>
        <div className={styles.mb}>:</div>
        <div className={styles.mb}>:</div>
      </div>
      <div className={styles.value}>
        <div className={styles.mb}>{item.distance}</div>
        <div className={styles.mb}>{item.tire}</div>
        <div className={styles.mb}>{item.battery}</div>
        <div className={styles.mb}>{item.status}</div>
        <div className={styles.mb}>{item.breakOil}</div>
        <div className={styles.mb}>{item.engineOil}</div>
        <div className={styles.mb}>{item.washer}</div>
      </div>
    </div>
  )
}

export default MycarInfo;