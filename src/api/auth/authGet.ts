import { GenericOk, User } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk & { payload: User };

export const authGet = () => apiBase.get<Response>('/auth');