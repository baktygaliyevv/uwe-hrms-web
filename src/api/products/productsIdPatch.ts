import { GenericOk, Product, ProductPatch } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk & { payload: Product };

export const productsIdPatch = (id: Product['id'], payload: ProductPatch) => 
    apiBase.patch<Response>(`/products/${id}`, payload);