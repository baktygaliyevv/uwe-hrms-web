import { GenericOk, User, UserPatch } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk & { payload: User };

export const usersIdPatch = (id: User['id'], payload: UserPatch) => apiBase.patch<Response>(`/users/${id}`, payload);