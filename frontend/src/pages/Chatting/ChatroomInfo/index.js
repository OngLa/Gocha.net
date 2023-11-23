import { useNavigate, useSearchParams } from "react-router-dom";
import style from "./chatroomInfo.module.css";
import LargeButton from "../../../components/Button";
import ChatPartnerProfile from "../components/ChatPartnerProfile";
import phoneIcon from "../../../img/member/phone-white.png";
import emailIcon from "../../../img/member/email-white.png";
import addressIcon from "../../../img/member/emailcheck-white.png";
import addressLocation from "./addressLocation.png";
import { useEffect, useState } from "react";
import { getCarcenterInfo } from "../../../service/chatting";

function ChatroomInfo(props) {
  const [searchParams] = useSearchParams();
  let carcenterId = searchParams.get("carcenterId");
  let carcenterName = searchParams.get("carcenterName");

  const [carcenterInfo, setCarcenterInfo] = useState({
    phoneNumber: "-",
    email: "-",
    address: "-",
  });

  useEffect(() => {
    const infoLoading = async () => {
      try {
        const response = await getCarcenterInfo(carcenterId);
        setCarcenterInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    infoLoading();
  }, []);

  const navigate = useNavigate(); // useNavigate 훅을 사용
  const handleChatroom = async () => {
    navigate(
      `/chatting/chatroom?carcenterId=${carcenterId}&carcenterName=${carcenterName}`
    );
  };

  return (
    <div className={style.ChatroomInfoWrap}>
      <ChatPartnerProfile carcenterName={carcenterName}></ChatPartnerProfile>
      <div className={style.largeButton}>
        <LargeButton
          children="문의하기"
          onClick={() => handleChatroom()}
        ></LargeButton>
      </div>
      <div className={style.infoBoxWrap}>
        {/* 전화번호 정보 */}
        <div className={style.infoBox}>
          <img src={phoneIcon} alt="phoneIcon" className={style.infoImg} />
          <div className={style.text}>{carcenterInfo.phoneNumber}</div>
        </div>
        {/* 이메일 정보 */}
        <div className={style.infoBox}>
          <img src={emailIcon} alt="emailIcon" className={style.infoImg} />
          <div className={style.text}>{carcenterInfo.email}</div>
        </div>
        {/* 주소 정보 */}
        <div className={style.infoBox}>
          <img
            src={addressIcon}
            alt="addressIcon"
            className={style.infoImg}
          />
          <div className={style.text}>{carcenterInfo.address}</div>
        </div>
        <div className={style.addressLocationWrap}>
          <img
            src={addressLocation}
            alt="addressIcon"
          />
        </div>
      </div>
    </div>
  );
}

export default ChatroomInfo;
