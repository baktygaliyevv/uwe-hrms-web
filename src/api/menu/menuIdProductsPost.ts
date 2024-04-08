import { GenericOk, Menu, MenuProduct, MenuProductPost } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk & { payload: MenuProduct };

export const menuIdProductsPost = (id: Menu['id'], payload: MenuProductPost) => 
    apiBase.post<Response>(`/menu/${id}/products`, payload);