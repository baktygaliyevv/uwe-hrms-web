import { FC } from "react";
import { Bookings } from "./components/Bookings/Bookings";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";

export const BookingsPage: FC = () => (
    <PageWrapper>
        <Bookings />
    </PageWrapper>
);