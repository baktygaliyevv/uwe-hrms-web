import { GenericOk, Product } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk;

export const productsIdDelete = (id: Product['id']) => apiBase.delete<Response>(`/products/${id}`);