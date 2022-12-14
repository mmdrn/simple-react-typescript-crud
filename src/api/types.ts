import { Product } from "../types/product.type"

export type GetProductsResponse = {
    products: Product[],
    total: number,
    skip: number,
    limit: number,
}