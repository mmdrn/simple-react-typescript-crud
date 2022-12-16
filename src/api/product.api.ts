import axios from "axios";
import { Product } from "../types/product.type";
import { GetProductsResponse, DeleteProductResponse, AddProductResponse, AddProduct as AddProductType } from "./types";
const backendUrl = process.env.REACT_APP_BACKEND_BASE_URL;

const GetAllProducts = async (skip: number, limit: number) => axios.get<GetProductsResponse>(`${backendUrl}products?${skip ? 'skip=' + skip + '&' : ''}${limit ? 'limit=' + limit + '&' : ''}`);
const DeleteProduct = async (id: string) => axios.delete<DeleteProductResponse>(`${backendUrl}products/${id}`);
const AddProduct = async (data: AddProductType) => axios.post<AddProductResponse>(`${backendUrl}products/add`, data);
const GetProduct = async (id: string) => axios.get<Product>(`${backendUrl}products/${id}`);
const GetAllCategories = async () => axios.get(`${backendUrl}products/categories`);

export { GetAllProducts, DeleteProduct, AddProduct, GetProduct, GetAllCategories }