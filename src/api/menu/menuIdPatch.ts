import { GenericOk, Menu, MenuPatch } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk & { payload: Menu };

export const menuIdPatch = (id: Menu['id'], payload: MenuPatch) => 
    apiBase.patch<Response>(`/menu/${id}`, payload);