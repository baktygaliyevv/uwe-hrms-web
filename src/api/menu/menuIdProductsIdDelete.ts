import { GenericOk, Menu, MenuProduct } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk;

export const menuIdProductsIdDelete = (menuId: Menu['id'], productId: MenuProduct['id']) =>
    apiBase.delete<Response>(`/menu/${menuId}/products/${productId}`);