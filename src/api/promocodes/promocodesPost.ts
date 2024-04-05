import { GenericOk, Promocode } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk & { payload: Promocode };

export const promocodesPost = (payload: Promocode) => apiBase.post<Response>('/promocodes', payload);