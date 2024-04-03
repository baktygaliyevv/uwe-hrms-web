import { GenericOk, User } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk;

export const usersIdDelete = (id: User['id']) => apiBase.delete<Response>(`/users/${id}`);