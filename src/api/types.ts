import { Product } from "../types/product.type"

export type GetProductsResponse = {
    products: Product[],
    total: number,
    skip: number,
    limit: number,
}

export type DeleteProductResponse = {
    id: number,
    title: string,
    description: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    brand: string,
    category: string,
    thumbnail: string,
    images: string[],
    isDeleted: boolean,
    deletedOn: string
}

export type AddProductResponse = {
    id: number,
    title: string,
    description: string,
    price: number,
    category: string,
}

export type AddProduct = {
    category: string,
    title: string,
    price: number,
    description: string,
}