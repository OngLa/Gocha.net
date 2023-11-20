import axios from "axios";

export function getChattingCarcenter() {
  try {
    return axios.get('http://localhost:8080/api/chatting/carcenter');
  } catch (error) {
    console.error("Error get ChattingCarcenter, ", error);
    throw error;
  }
};

export function getChattingUser() {
  try {
    return axios.get('http://localhost:8080/api/chatting/user');
  } catch (error) {
    console.error("Error get ChattingUser, ", error);
    throw error;
  }
};

export function getChatroom(memberId) {
  try {
    return axios.get('http://localhost:8080/api/chatting/chatroom', { params: { member_id : memberId } });

  } catch (error) {
    console.error("Error get Chatroom, ", error);
    throw error;
  }
};

export function sendMessage(message) {
  try {
    return axios.post('http://localhost:8080/api/chatting/sendmessage', message);

  } catch (error) {
    console.error("Error insert Message, ", error);
    throw error;
  }
};

export function getCarData(cardataId) {
  try {
    return axios.get('http://localhost:8080/api/chatting/open-cardata', { params: { cardataId :cardataId } } );
  } catch (error) {
    console.error("Error get cardata, ", error);
    throw error;
  }
};

// export const getCarTypes = async (brandId) => {
//   try {
//     const response = await axios.get(
//       "http://localhost:8080/api/cars/car-type",
//       { params: { brandId } }
//     );
//     // const response = await axios.get("/cars/car-type", { params: { brandId } });
//     return response.data;
//   } catch (error) {
//     console.error("Error get Brands, ", error);
//     throw error;
//   }
// };
