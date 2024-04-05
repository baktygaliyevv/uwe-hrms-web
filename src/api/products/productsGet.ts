import { GenericOk, Product } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk & { payload: Product[] };

export const productsGet = () => apiBase.get<Response>('/products');