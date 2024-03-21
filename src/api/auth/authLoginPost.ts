import { LoginPost, User, GenericOk } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk & { payload: User };

export const authLoginPost = (payload: LoginPost) => apiBase.post<Response>('/auth/login', payload);