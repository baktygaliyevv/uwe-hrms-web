import { Booking, GenericOk } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk;

export const bookingsIdDelete = (id: Booking['id']) => apiBase.delete<Response>(`/bookings/${id}`);