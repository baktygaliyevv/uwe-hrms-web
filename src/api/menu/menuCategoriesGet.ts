import { GenericOk, MenuCategory } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk & { payload: MenuCategory[] };

export const menuCategoriesGet = () => apiBase.get<Response>('/menu/categories');