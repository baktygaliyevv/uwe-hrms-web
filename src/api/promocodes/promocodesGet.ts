import { GenericOk, Promocode } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk & { payload: Promocode[] };

export const promocodesGet = () => apiBase.get<Response>('/promocodes');