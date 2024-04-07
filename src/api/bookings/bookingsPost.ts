import { Booking, BookingPost, GenericOk } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk & { payload: Booking };

export const bookingsPost = (payload: BookingPost) => apiBase.post<Response>('/bookings', payload);