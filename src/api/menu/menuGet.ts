import { GenericOk, Menu } from "../../types/domain";
import { apiBase } from "../base";

export const menuGet = () => apiBase.get<GenericOk & { payload: Menu[] }>('/menu');