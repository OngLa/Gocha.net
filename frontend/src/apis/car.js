import axios from "axios";

export const getBrands = async () => {
  try {
    // const response = await axios.get("/cars/brand");
    const response = await axios.get("http://localhost:8080/api/cars/brand");
    return response.data;
  } catch (error) {
    console.error("Error get Brands, ", error);
    throw error;
  }
};
