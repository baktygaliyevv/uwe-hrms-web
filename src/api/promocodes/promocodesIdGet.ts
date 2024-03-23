import { GenericOk, Promocode } from "../../types/domain";
import { apiBase } from "../base";

type Params = { id: string };
type Response = GenericOk & { payload: Promocode };

export const promocodesIdGet = ({ id }: Params) => apiBase.get<Response>(`/promocodes/${id}`);