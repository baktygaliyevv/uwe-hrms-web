import { FC } from "react";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { Signup } from "./components/Signup/Signup";

export const SignupPage: FC = () => (
    <PageWrapper hideHeader>
        <Signup />
    </PageWrapper>
)