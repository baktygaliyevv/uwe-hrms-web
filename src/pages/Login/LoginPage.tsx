import { FC } from "react";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { Login } from "./components/Login/Login";

export const LoginPage: FC = () => {
    return (
        <PageWrapper hideHeader>
            <Login />
        </PageWrapper>
    )
}