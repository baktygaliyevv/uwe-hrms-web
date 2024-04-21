import { CartStoreType } from "../stores/CartStore";
import { Promocode } from "../types/domain";

export const calculateCart = (cart: CartStoreType['cart'], promocode?: Promocode | null) => ({
    totalQuantity: cart.reduce((sum, { quantity }) => sum + quantity, 0),
    subTotalSum: cart.reduce((sum, { item, quantity }) => sum + item.price * quantity, 0),
    totalSum: Math.round((cart.reduce((sum, { item, quantity }) => sum + item.price * quantity, 0) * ((100 - (promocode?.discount || 0)) / 100) + Number.EPSILON) * 100) / 100
});