import axios from "axios";

export const getBrands = async () => {
  const response = await axios.get("http://localhost:8080/api/cars/brand");
  // const response = await axios.get("/cars/brand");
  return response.data;
};

export const getCarTypes = async (brandId) => {
  const response = await axios.get("http://localhost:8080/api/cars/car-type", {
    params: { brandId },
  });
  // const response = await axios.get("/cars/car-type", { params: { brandId } });
  return response.data;
};

export const postCar = async (car) => {
  try {
    const response = await axios.post("http://localhost:8080/api/cars", car);
    // const response = await axios.get("/cars", car);
    return response.data;
  } catch (error) {
    console.error("Error get Brands, ", error);
    throw error;
  }
};
