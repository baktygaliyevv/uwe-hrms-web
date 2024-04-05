import { GenericOk, Promocode } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk;

export const promocodesIdDelete = (id: Promocode['id']) => apiBase.delete<Response>(`/promocodes/${id}`);