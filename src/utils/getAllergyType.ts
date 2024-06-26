import { Product } from "../types/domain";

export const isVegan = (products: Product[]) => products.every(({ vegan }) => vegan);
export const isVegetarian = (products: Product[]) => products.every(({ vegetarian }) => vegetarian);
export const isGlutenFree = (products: Product[]) => products.every(({ gluten_free }) => gluten_free);

export const getAllergyType = (products: Product[]) => {
    const types: ('V' | 'VE' | 'GF')[] = [];
    if(isVegan(products)) types.push('V');
    else if(isVegetarian(products)) types.push('VE');
    if(isGlutenFree(products)) types.push('GF');
    return types;
}