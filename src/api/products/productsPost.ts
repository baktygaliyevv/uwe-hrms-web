import { GenericOk, Product, ProductPost } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk & { payload: Product };

export const productsPost = (payload: ProductPost) => apiBase.post<Response>('/products', payload);