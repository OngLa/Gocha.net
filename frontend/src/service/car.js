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
    const response = await axios.get("/cars", car);
    return response.data;
  } catch (error) {
    console.error("Error get Brands, ", error);
    throw error;
  }
};

export const getMyCar = async () => {
  try {
    const response = await axios.get("/cars/car-list");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error get Brands, ", error);
    throw error;
  }
};
