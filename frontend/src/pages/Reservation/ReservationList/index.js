import { SmallButton } from "../../../components/Button";

function ReservationList() {
  return (
    <div className="ReservationList">
      <div className="box">
        <div className="cardtitle"></div>
        <div className="cardbody">
          <div className="content"></div>
          <div><SmallButton>예약취소</SmallButton></div>
        </div>
      </div>
    </div>
  );
}
export default ReservationList;
