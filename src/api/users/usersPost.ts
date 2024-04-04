import { GenericOk, User, UserPost } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk & { payload: User };

export const usersPost = (payload: UserPost) => apiBase.post<Response>('/users', payload);