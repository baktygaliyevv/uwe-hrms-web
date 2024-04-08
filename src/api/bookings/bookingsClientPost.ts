import { BookingClient, BookingClientPost, GenericOk } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk & { payload: BookingClient };

export const bookingsClientPost = (payload: BookingClientPost) => 
    apiBase.post<Response>('/bookings/client', payload);