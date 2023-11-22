import axios from "axios";

export function getChattingCarcenter() {
  // 비대면 진단을 위해 채팅방 목록 출력 - 고객용(모든 카센터 다 출력)
  try {
    return axios.get("/chatting/carcenter");
  } catch (error) {
    console.error("Error get ChattingCarcenter, ", error);
    throw error;
  }
};

export function getChattingUser() {
  // 비대면 진단을 위해 채팅방 목록 출력 - 카센터용(본인에게 메세지 보낸 고객 다 출력)
  try {
    return axios.get("/chatting/user");
  } catch (error) {
    console.error("Error get ChattingUser, ", error);
    throw error;
  }
};

export function getChatroom(memberId) {
  // 채팅방 - 메세지 전체 조회(공통)
  try {
    return axios.get("/chatting/chatroom", { params: { member_id : memberId } });

  } catch (error) {
    console.error("Error get Chatroom, ", error);
    throw error;
  }
};

export function sendMessage(message) {
  // 글 작성 - 제목, 내용, 예약활성화여부, 차량데이터id를 받아와 저장. Role에 따라 예약활성화여부 or 차량데이터id 저장여부가 switch됨.
  try {
    return axios.post("/chatting/sendmessage", message);

  } catch (error) {
    console.error("Error insert Message, ", error);
    throw error;
  }
};

export function getCarData(cardataId) {
  // Car Data 불러오기 - 채팅방에서 고객이 데이터 첨부 시 데이터 로딩할 API - 공통
  try {
    return axios.get("/chatting/open-cardata", { params: { cardataId :cardataId } } );
  } catch (error) {
    console.error("Error get cardata, ", error);
    throw error;
  }
}

export function getCarcenterInfo(carcenterId) {
  // Carcerter 정보 불러오기 - 채팅방 입장 전 카센터 정보 확인하기
  try {
    return axios.get("/chatting/carcenterinfo", { params: { carcenterId :carcenterId } } );
  } catch (error) {
    console.error("Error get carcenterInfo, ", error);
    throw error;
  }
};
