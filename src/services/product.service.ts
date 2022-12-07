import { IProductService } from "../interfaces/IProductService.interface";

export class ProductService implements IProductService {
    GetAllProducts(data: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
}