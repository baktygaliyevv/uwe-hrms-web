import { GenericOk, MenuCategory, MenuCategoryPost } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk & { payload: MenuCategory };

export const menuCategoriesPost = (payload: MenuCategoryPost) => 
    apiBase.post<Response>('/menu/categories', payload);