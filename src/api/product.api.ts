import axios from "axios";
import { DeletedProduct } from "../types/product.type";
import { GetProductsResponse } from "./types";
const backendUrl = process.env.REACT_APP_BACKEND_BASE_URL;

const GetAllProducts = async (skip: number, limit: number) => axios.get<GetProductsResponse>(`${backendUrl}products?${skip ? 'skip=' + skip + '&' : ''}${limit ? 'limit=' + limit + '&' : ''}`);
const DeleteProduct = async (id: string) => axios.delete<DeletedProduct>(`${backendUrl}products/${id}`);

export { GetAllProducts, DeleteProduct }