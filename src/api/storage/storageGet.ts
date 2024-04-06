import { GenericOk, StorageItem } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk & { payload: StorageItem[] };

export const storageGet = () => apiBase.get<Response>('/storage');