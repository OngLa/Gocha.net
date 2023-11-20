import axios from "axios";

export const getBrands = async () => {
  const response = await axios.get("/cars/brand");
  return response.data;
};

export const getCarTypes = async (brandId) => {
  const response = await axios.get("/cars/car-type", { params: { brandId } });
  return response.data;
};

export const postCar = async (car) => {
  try {
    const response = await axios.post("/cars", car);
    return response.data;
  } catch (error) {
    console.error("Error get Brands, ", error);
    throw error;
  }
};

export const getMyCar = async () => {
  try {
    const response = await axios.get("/cars/car-list");
    return response.data;
  } catch (error) {
    console.error("Error get Brands, ", error);
    throw error;
  }
};

export const getRecentCarData = async (carId) => {
  try {
    const response = await axios.get("/car-data/recent-data", {
      params: { carId },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.log("에러코드 응답 : ", error.response.data.message);
      }
    } else if (error.request) {
      alert("서버에서 응답이 없습니다.");
    } else {
      alert("요청을 처리하는 중에 문제가 발생했습니다.");
    }

    throw error;
  }
};

export const deleteCar = async (carId) => {
  try {
    const response = await axios.delete("/cars", {params: {carId}});
    return response.data;
  } catch (error) {
    console.error("Error get Brands, ", error);
    throw error;
  }
};