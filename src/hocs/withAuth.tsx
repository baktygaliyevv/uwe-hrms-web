import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOwnUser } from "../stores/OwnUserStore";
import { authGet } from "../api/auth/authGet";
import { Loader } from "../components/Loader/Loader";

export const withAuth = (WrappedComponent: FC) => {
    const Component: FC = () => {
        const navigateTo = useNavigate();
        const [loading, setLoading] = useState(true);
        const { own, setOwn } = useOwnUser();

        useEffect(() => {
            if(own) setLoading(false);
            authGet()
                .then(({ data }) => setOwn(data.payload))
                .catch(() => navigateTo('/login'));
        }, [own]);

        if(loading) {
            return <Loader />;
        }

        return <WrappedComponent />;
    }

    return Component;
}