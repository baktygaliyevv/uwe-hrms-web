/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface GenericOk {
  status: "Ok";
}

export interface GenericUnauthorized {
  status: "Error";
  error: "Authorization failed. Please see `payload` for more details.";
}

export interface GenericNotFound {
  status: "Error";
  error: "Not found.";
}

export interface GenericInternalError {
  status: "Error";
  error: "Something went terribly wrong, Check `payload` for more details. Contact me at hi@dyzoon.dev";
}

export type Role = "admin" | "manager" | "chef" | "staff" | "courier" | "client";

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: Role;
}

export interface UserPost {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: Role;
}

export interface UserPatch {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  role?: Role;
}

export interface LoginPost {
  email: string;
  password: string;
}

export type SignupPost = LoginPost & {
  first_name: string;
  last_name: string;
};

export interface Restaurant {
  id: number;
  city: string;
}

export interface BookingClient {
  id: number;
  table: Table;
  persons: number;
  /** @format date-time */
  date: string;
  comment: string;
}

export interface BookingClientPost {
  table_id: number;
  persons: number;
  /** @format date-time */
  date: string;
  comment: string;
}

export type Booking = BookingClient & {
  user: User;
};

export type BookingPost = BookingClientPost & {
  user_id?: number;
};

export interface BookingPatch {
  table_id?: number;
  persons?: number;
  /** @format date-string */
  date?: string;
  comment?: string;
}

export interface Product {
  id: number;
  name: string;
  vegan: boolean;
  vegetarian: boolean;
  gluten_free: boolean;
}

export interface ProductPost {
  name: string;
  vegan: boolean;
  vegetarian: boolean;
  gluten_free: boolean;
}

export interface ProductPatch {
  name?: string;
  vegan?: boolean;
  vegetarian?: boolean;
  gluten_free?: boolean;
}

export interface StorageItem {
  restaurant: Restaurant;
  product: Product;
  count: number;
}

export interface StorageItemAlter {
  restaurant_id: number;
  product_id: number;
}

export interface Table {
  id: number;
  restaurant: Restaurant;
  capacity: number;
}

export interface TablePost {
  restaurant_id: number;
  capacity: number;
}

export interface TablePatch {
  restaurant_id?: number;
  capacity?: number;
}

export interface Menu {
  id: number;
  name: string;
  category: MenuCategory;
  price: number;
  products: Product[];
}

export interface MenuPost {
  name: string;
  category_id: number;
  price: number;
  products: number[];
}

export interface MenuPatch {
  name?: string;
  category_id?: number;
  price?: number;
}

export interface MenuProduct {
  id: number;
  name: string;
}

export interface MenuProductPost {
  product_id: number;
}

export interface MenuCategory {
  id: number;
  name: string;
}

export interface MenuCategoryPost {
  name: string;
}

export interface OrderItem {
  item: Menu;
  quantity: number;
}

export interface OrderItemPost {
  item_id: number;
  quantity: number;
}

export interface OrderItemPatch {
  quantity: number;
}

export interface OrderGeneric {
  id: number;
  table: Table;
  promocode: Promocode | null;
  /** @format date-time */
  created_at: string;
  /** @format date-time */
  complete_at: string | null;
  items: OrderItem[];
}

export type Order = OrderGeneric & {
  user: User | null;
};

export interface OrderPostGeneric {
  table_id: number;
  promocode_id?: string | null;
  items: OrderItemPost[];
}

export type OrderClientPost = OrderPostGeneric & {
  email?: string | null;
  first_name?: string | null;
  last_name?: string | null;
};

export type OrderPost = OrderPostGeneric & {
  user_id?: number | null;
};

export interface OrderPatch {
  user_id?: number;
  table_id?: number;
  promocode_id?: string;
  /** @format date-time */
  complete_at?: string;
}

export interface DeliveryItem {
  item: Menu;
  quantity: number;
}

export interface DeliveryItemPost {
  item_id: number;
  quantity: number;
}

export interface DeliveryItemPatch {
  quantity: number;
}

export type DeliveryStatus = "new" | "delivering" | "complete";

export interface DeliveryGeneric {
  id: number;
  restaurant: Restaurant;
  promocode: Promocode | null;
  address: string;
  /** @format date-time */
  created_at: string;
  status: DeliveryStatus;
  items: DeliveryItem[];
}

export type Delivery = DeliveryGeneric & {
  user: User;
};

export interface DeliveryPostGeneric {
  restaurant_id: number;
  promocode_id?: string | null;
  address: string;
  items: DeliveryItemPost[];
}

export type DeliveryPost = DeliveryPostGeneric & {
  user_id: number;
};

export type DeliveryClientPost = DeliveryPostGeneric & {
  email?: string | null;
  first_name?: string | null;
  last_name?: string | null;
};

export interface DeliveryPatch {
  user_id?: number;
  restaurant_id?: number;
  promocode_id?: string;
  status?: DeliveryStatus;
}

export interface Promocode {
  id: string;
  discount: number;
  /** @format date-time */
  valid_till: string;
}
