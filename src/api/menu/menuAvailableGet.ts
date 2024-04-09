import { GenericOk, Menu, Restaurant } from "../../types/domain";
import { apiBase } from "../base";

export const menuAvailableGet = (restaurantId: Restaurant['id']) => 
        apiBase.get<GenericOk & { payload: Menu[] }>(`/menu/available?restaurant_id=${restaurantId}`);