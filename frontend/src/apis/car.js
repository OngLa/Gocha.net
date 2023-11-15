import axios from "axios";

export const getBrands = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/cars/brand");
    // const response = await axios.get("/cars/brand");
    return response.data;
  } catch (error) {
    console.error("Error get Brands, ", error);
    throw error;
  }
};

export const getCarTypes = async (brandId) => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/cars/car-type",
      { params: { brandId } }
    );
    // const response = await axios.get("/cars/car-type", { params: { brandId } });
    return response.data;
  } catch (error) {
    console.error("Error get Brands, ", error);
    throw error;
  }
};
