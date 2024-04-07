import { Booking, BookingPatch, GenericOk } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk & { payload: Booking };

export const bookingsIdPatch = (id: Booking['id'], payload: BookingPatch) => 
    apiBase.patch<Response>(`/bookings/${id}`, payload);