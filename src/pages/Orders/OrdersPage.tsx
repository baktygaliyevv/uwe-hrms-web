import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { Orders } from "./components/Orders/Orders";
import { withAuth } from "../../hocs/withAuth";

export const OrdersPage = withAuth(() => (
    <PageWrapper>
        <Orders />
    </PageWrapper>
));