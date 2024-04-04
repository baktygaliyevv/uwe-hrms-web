import { GenericOk, Table, TablePost } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk & { payload: Table };

export const tablesPost = (payload: TablePost) => apiBase.post<Response>('/tables', payload);