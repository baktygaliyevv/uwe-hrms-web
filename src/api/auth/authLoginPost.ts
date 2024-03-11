import { LoginPost, User } from "../../types/domain";
import { GenericOk } from "../../types/genericResponses";
import { apiBase } from "../base";

type Response = GenericOk<User>;

export const authLoginPost = (payload: LoginPost) => apiBase.post<Response>('/auth/login', payload);