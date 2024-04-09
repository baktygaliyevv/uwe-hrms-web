import { GenericOk, Menu, MenuPost } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk & { payload: Menu };

export const menuPost = (payload: MenuPost) => apiBase.post<Response>('/menu', payload);