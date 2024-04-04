import { GenericOk, Table } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk;

export const tablesIdDelete = (id: Table['id']) => apiBase.delete<Response>(`/tables/${id}`);