import { GenericOk, StorageItem, StorageItemAlter } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk & { payload: StorageItem };

export const storageIncrementPatch = (payload: StorageItemAlter) => 
    apiBase.patch<Response>('/storage/increment', payload);