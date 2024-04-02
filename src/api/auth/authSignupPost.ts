import { GenericOk, SignupPost } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk;

export const authSignupPost = (payload: SignupPost) => apiBase.post<Response>('/auth/signup', payload);