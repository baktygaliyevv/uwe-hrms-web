import { GenericOk } from "../../types/genericResponses";
import { apiBase } from "../base";

type Payload = {
    phone: string;
    password: string;
}

type Response = GenericOk<{
    role: Record<string, boolean>;
}>;

export const apiAuthLogin = (payload: Payload) => apiBase.post<Response>('/auth/login', payload);