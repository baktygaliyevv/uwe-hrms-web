import { FC } from "react";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { Forgot } from "./components/Forgot/Forgot";

export const ForgotPage: FC = () => (
    <PageWrapper hideHeader>
        <Forgot />
    </PageWrapper>
);