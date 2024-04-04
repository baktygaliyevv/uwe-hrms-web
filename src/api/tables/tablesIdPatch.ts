import { GenericOk, Table, TablePatch } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk & { payload: Table };

export const tablesIdPatch = (id: Table['id'], payload: TablePatch) => apiBase.patch<Response>(`/tables/${id}`, payload);