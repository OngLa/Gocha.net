import { bottom } from '@popperjs/core';
import styles from './style.module.css'

function MycarInfo(props) {

  const {item} = props;

  return (
    <div className={styles.wrapper}>
      <div className={styles.tag}>
        <div style={{marginBottom: 2}}>주행거리</div>
        <div style={{marginBottom: 2}}>타이어 상태</div>
        <div style={{marginBottom: 2}}>배터리 잔량</div>
        <div style={{marginBottom: 2}}>충전 상태</div>
        <div style={{marginBottom: 2}}>브레이크 오일</div>
        <div style={{marginBottom: 2}}>엔진 오일</div>
        <div style={{marginBottom: 2}}>워셔액</div>
      </div>
      <div className={styles.between}>
        <div style={{marginBottom: 2}}>:</div>
        <div style={{marginBottom: 2}}>:</div>
        <div style={{marginBottom: 2}}>:</div>
        <div style={{marginBottom: 2}}>:</div>
        <div style={{marginBottom: 2}}>:</div>
        <div style={{marginBottom: 2}}>:</div>
        <div style={{marginBottom: 2}}>:</div>
      </div>
      <div className={styles.value}>
        <div style={{marginBottom: 2}}>{item.distance}</div>
        <div style={{marginBottom: 2}}>{item.tire}</div>
        <div style={{marginBottom: 2}}>{item.battery}</div>
        <div style={{marginBottom: 2}}>{item.status}</div>
        <div style={{marginBottom: 2}}>{item.breakOil}</div>
        <div style={{marginBottom: 2}}>{item.engineOil}</div>
        <div style={{marginBottom: 2}}>{item.washer}</div>
      </div>
    </div>
  )
}

export default MycarInfo;