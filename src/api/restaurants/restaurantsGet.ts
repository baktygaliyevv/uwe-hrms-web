import { GenericOk, Restaurant } from "../../types/domain";
import { apiBase } from "../base";

export const restaurantsGet = () => apiBase.get<GenericOk & { payload: Restaurant[] }>('/restaurants');