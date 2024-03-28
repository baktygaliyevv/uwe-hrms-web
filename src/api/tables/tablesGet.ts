import { GenericOk, Table } from "../../types/domain";
import { apiBase } from "../base";

export const tablesGet = () => apiBase.get<GenericOk & { payload: Table[] }>('/tables');