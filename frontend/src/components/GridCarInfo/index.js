import GirdItemContent from "./GirdItemContent";
import styleA from "./styleA.module.css";
import styleB from "./styleB.module.css";

function GridCarInfo(props) {
  const { item, layoutType, fontSize } = props;

  const styles = (layoutType ==='A')?styleA:styleB;

  return (
    <div className={styles.wrapper}>
      <div className={styles.item1}><GirdItemContent tag="주행 가능 거리" value={item.cango_distance} fontSize={fontSize} /></div>
      <div className={styles.item2}><GirdItemContent tag="누적 거리" value={item.distance} fontSize={fontSize} /></div>

      <div className={styles.item3}><GirdItemContent tag="배터리 잔량" value={item.car_battery} fontSize={fontSize} /></div>
      <div className={styles.item4}><GirdItemContent tag="충전 상태" value={item.charge_status} fontSize={fontSize} /></div>
      <div className={styles.item5}><GirdItemContent tag="브레이크 오일" value={item.break} fontSize={fontSize} /></div>
      <div className={styles.item6}><GirdItemContent tag="엔진 오일" value={item.engine} fontSize={fontSize} /></div>

      <div className={styles.item7}><GirdItemContent tag="주유" value={item.oil} fontSize={fontSize} /></div>
      <div className={styles.item8}><GirdItemContent tag="워셔액" value={item.washer} fontSize={fontSize} /></div>
      <div className={styles.item9}><GirdItemContent tag="타이어 공기압" value={item.tire} fontSize={fontSize} /></div>
      <div className={styles.item10}><GirdItemContent tag="Lamp wire" value={item.lampwire} fontSize={fontSize} /></div>
    </div>
  );
}

export default GridCarInfo;
