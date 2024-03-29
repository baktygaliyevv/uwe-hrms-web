import { GenericOk } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk;

export const authDelete = () => apiBase.delete<Response>('/auth');