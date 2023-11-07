import { useState } from "react";
import style from "./mypage.module.css";
import { Link, useNavigate } from "react-router-dom";
import ContentHeader from "../../../components/ContentHeader";
import { SmallButton } from "../../../components/Button";

function Mypage() {
  const navigate = useNavigate();

  const [mypage, setMypage] = useState({
    email: "test@test",
    password: "*******",
    nickname: "test",
    phoneNumber: "010-1111-1111",
    carTypes: [
      { id: 1, name: "IONIQ5" },
      { id: 2, name: "KONA" },
    ],
    carcenters: [
      { id: 1, name: "서울점" },
      { id: 2, name: "충청점" },
    ],
  });

  const handleEditPassword = () => {
    navigate("/member/emailCheck");
  };

  const [selectCar, setSelectCar] = useState("선택 차종");

  const handleSelectCar = (e) => {
    setSelectCar(e.target.value);
  };

  const handleDeleteCar = (e) => {};

  const [selectCarcenter, setSelectCarcenter] = useState("선택 정비소");

  const handleSelectCarcenter = (e) => {
    setSelectCarcenter(e.target.value);
  };

  const handleDeleteCarcenter = (e) => {};

  const handleWithdrawal = (e) => {
    return alert("정말 탈퇴하시겠습니까?");
  };

  return (
    <div>
      <div className={style.menu}>
        <ContentHeader menuName="마이페이지" />
      </div>
      <div className={style.mypageWrap}>
        <div className={style.mypageBox}>
          <img
            src="/memberIcon/email-white.png"
            alt="emailImg"
            className={style.mypageImg}
          />
          <div className={style.text}>{mypage.email}</div>
        </div>
        <div className={style.mypageBox}>
          <img
            src="/memberIcon/password-white.png"
            alt="passwordImg"
            className={style.mypageImg}
          />
          <div className={style.text}>{mypage.password}</div>
          <SmallButton
            className={style.editpasswordBtn}
            onClick={handleEditPassword}
            style={{ width: "60px", height: "25px" }}
          >
            수정하기
          </SmallButton>
        </div>
        <div className={style.mypageBox}>
          <img
            src="/memberIcon/nickname-white.png"
            alt="nicknameImg"
            className={style.mypageImg}
          />
          <div className={style.text}>{mypage.nickname}</div>
        </div>
        <div className={style.mypageBox}>
          <img
            src="/memberIcon/phone-white.png"
            alt="phoneImg"
            className={style.mypageImg}
          />
          <div className={style.text}>{mypage.phoneNumber}</div>
        </div>
        <div className={style.mypageBox}>
          <img
            src="/memberIcon/reservation.png"
            alt="reservationImg"
            className={style.mypageImg}
          />
          <Link
            to="/Reservation/ReservationList"
            className={style.mypageReservation}
          >
            내 예약목록
          </Link>
        </div>
        <div className={style.mypageBox}>
          <img
            src="/memberIcon/carType.png"
            alt="carTypeImg"
            className={style.mypageImg}
          />
          <select
            className={style.mypageSelect}
            value={selectCar}
            onChange={handleSelectCar}
          >
            {mypage.carTypes.map((car) => (
              <option key={car.id} value={car.name}>
                {car.name}
              </option>
            ))}
          </select>
          <SmallButton
            className={style.deleteCarBtn}
            onClick={handleDeleteCar}
            style={{ width: "60px", height: "25px", marginLeft: "73px" }}
          >
            삭제하기
          </SmallButton>
        </div>
        <div className={style.mypageBox}>
          <img
            src="/memberIcon/carcenter.png"
            alt="carcenterImg"
            className={style.mypageImg}
          />
          <select
            className={style.mypageSelect}
            value={selectCarcenter}
            onChange={handleSelectCarcenter}
          >
            {mypage.carcenters.map((carcenter) => (
              <option key={carcenter.id} value={carcenter.name}>
                {carcenter.name}
              </option>
            ))}
          </select>
          <SmallButton
            className={style.deleteCarBtn}
            onClick={handleDeleteCarcenter}
            style={{ width: "60px", height: "25px", marginLeft: "73px" }}
          >
            삭제하기
          </SmallButton>
        </div>
      </div>
      <div className={style.withdrawalBox}>
      <button className={style.withdrawalBtn} onClick={handleWithdrawal}>
        회원탈퇴
      </button>
      </div>
    </div>
  );
}

export default Mypage;
