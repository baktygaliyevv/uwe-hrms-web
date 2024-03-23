import { FC } from "react";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { Checkout } from "./components/Checkout/Checkout";

export const CheckoutPage: FC = () => (
    <PageWrapper>
        <Checkout />
    </PageWrapper>
);