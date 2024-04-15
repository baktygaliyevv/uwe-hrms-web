import { FC } from "react";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { Checkout } from "./components/Checkout/Checkout";
import { useSearchParams } from "react-router-dom";

export const CheckoutPage: FC = () => {
    const [searchParams] = useSearchParams();
    const presetTable = searchParams.get('table');

    return (
        <PageWrapper>
            <Checkout 
                presetTable={presetTable ? parseInt(presetTable) : undefined}
            />
        </PageWrapper>
    );
}