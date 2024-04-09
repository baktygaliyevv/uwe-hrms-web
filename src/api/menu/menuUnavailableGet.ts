import { GenericOk, Menu, Restaurant } from "../../types/domain";
import { apiBase } from "../base";

export const menuUnavailableGet = (restaurantId: Restaurant['id']) => 
    apiBase.get<GenericOk & { payload: Menu[] }>(`/menu/unavailable?restaurant_id=${restaurantId}`);