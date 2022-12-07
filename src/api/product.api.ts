import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_BASE_URL;

const GetAllProducts = async (data: any) => axios.post(`${backendUrl}/products`, data);

export { GetAllProducts }