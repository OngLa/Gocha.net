import axios from "axios";

export function getChattingCarcenter() {
  try {
    return axios.get('http://localhost:8080/api/chatting/carcenter');
  } catch (error) {
    console.error("Error get ChattingCarcenter, ", error);
    throw error;
  }
};

export function getChatroom(carcenterId) {
  try {
    return axios.get('http://localhost:8080/api/chatting/chatroom', { params: { member_id : carcenterId } });

  } catch (error) {
    console.error("Error get Chatroom, ", error);
    throw error;
  }
};


// api(`/usersendmessage/${cno}/?title=${message.title}&content=${message.content}&selectedData=${message.selectData}`);
export function sendMessage(message) {
  try {
    return axios.get('http://localhost:8080/api/chatting/sendmessage',
      new URLSearchParams({
        member_id: message.carcenterId,
        title: message.title,
        content: message.content,
        is_reservation: null,
        cardata_id: message.selectData
    }
    ));
    // return axios.get('http://localhost:8080/api/chatting/chatroom', { params: { member_id : carcenterId } });

  } catch (error) {
    console.error("Error get Chatroom, ", error);
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
