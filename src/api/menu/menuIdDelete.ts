import { GenericOk, Menu } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk;

export const menuIdDelete = (id: Menu['id']) => apiBase.delete<Response>(`/menu/${id}`);