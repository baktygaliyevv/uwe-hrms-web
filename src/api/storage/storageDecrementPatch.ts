import { GenericOk, StorageItem, StorageItemAlter } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk & { payload: StorageItem };

export const storageDecrementPatch = (payload: StorageItemAlter) => 
    apiBase.patch<Response>('/storage/decrement', payload);