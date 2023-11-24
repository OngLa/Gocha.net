// import
import React from "react";
import GirdItemContent from "./GirdItemContent";
import styleA from "./styleA.module.css";
import styleB from "./styleB.module.css";
import styleC from "./styleC.module.css";

// GridCarInfo Component
// Props : item(데이터 정보), layoutType(레이아웃 종류), style(추가하고 싶은 style)
function GridCarInfo(props) {
  const { item, layoutType, style } = props;

  // 동적으로 레이아웃 종류에 따른 css 파일 결정
  let styles;
  if (layoutType === "A") {
    styles = styleA;
  } else if (layoutType === "B") {
    styles = styleB;
  } else {
    styles = styleC;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.item1}><GirdItemContent tag="주행 가능 거리" value={item.canGoDistance} style={style} /></div>
      <div className={styles.item2}><GirdItemContent tag="누적 거리" value={item.distance} style={style} /></div>

      <div className={styles.item3}><GirdItemContent tag="배터리 잔량" value={item.carBattery} style={style} /></div>
      <div className={styles.item4}><GirdItemContent tag="충전 상태" value={item.batteryCharge} style={style} /></div>
      <div className={styles.item5}><GirdItemContent tag="브레이크 오일" value={item.breakOil} style={style} /></div>
      <div className={styles.item6}><GirdItemContent tag="엔진 오일" value={item.engineOil} style={style} /></div>

      <div className={styles.item7}><GirdItemContent tag="주유" value={item.oil} style={style} /></div>
      <div className={styles.item8}><GirdItemContent tag="워셔액" value={item.washer} style={style} /></div>
      <div className={styles.item9}><GirdItemContent tag="타이어 공기압" value={item.tire} style={style} /></div>
      <div className={styles.item10}><GirdItemContent tag="Lamp wire" value={item.lampWire} style={style} /></div>
    </div>
  );
}

// Component 최적화, Props 값의 변화에 따른 리랜더링 방지
export default React.memo(GridCarInfo);
