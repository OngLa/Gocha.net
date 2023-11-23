import axios from "axios";

export const getMyCar = async () => {
  try {
    // api 호출
    const response = await axios.get("/cars/car-list");
    // 결과 리턴
    return response.data;
  } catch (error) {
    // 에러 리턴
    throw error.response.data;
  }
};

export const getRecentCarData = async (carId) => {
  try {
    // api 호출
    const response = await axios.get("/car-data/recent-data", {
      params: { carId },
    });

    // 결과 리턴
    return response.data;
  } catch (error) {
    // 에러 리턴
    throw error.response.data;
  }
};

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

export const deleteCar = async (carId) => {
  try {
    const response = await axios.delete("/cars", { params: { carId } });
    return response.data;
  } catch (error) {
    console.error("Error get Brands, ", error);
    throw error;
  }
};

export const getCarDataList = async (req) => {
  try {
    const response = await axios.get("/car-data/data-list", {
      params: {
        carId: req.carId,
        startDate: req.startDate,
        endDate: req.endDate,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const postCarData = async (req) => {
  try {
    const response = await axios.post("/car-data", req);
    return response;
  } catch (error) {
    console.error("Error get Brands, ", error);
    throw error;
  }
};
