import { FC, useCallback, useEffect, useState } from "react";
import { Button, Flex, Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { Promocode } from "../../../../types/domain";
import { promocodesGet } from "../../../../api/promocodes/promocodesGet";
import { AdminPromocode } from "../AdminPromocode/AdminPromocode";
import { AddAdminPromocodeModal } from "../AddAdminPromocodeModal/AddAdminPromocodeModal";

export const AdminPromocodes: FC = () => {
    const [promocodes, setPromocodes] = useState<Promocode[]>([]);

    const getPromocodes = useCallback(() => 
        promocodesGet().then(({ data }) => setPromocodes(data.payload)), 
    []);

    useEffect(() => {
        getPromocodes();
    }, []);

    const [openModal, setOpenModal] = useState(false);

    return (
        <TableContainer padding="16px 10%">
            <Flex width="100%" justify="flex-end">
                <Button onClick={() => setOpenModal(true)}>Add promocode</Button>
            </Flex>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Discount (%)</Th>
                        <Th>Valid untill</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {promocodes.map((promocode) => (
                        <AdminPromocode 
                            key={promocode.id} 
                            promocode={promocode} 
                            onChange={getPromocodes} 
                        />
                    ))}
                </Tbody>
            </Table>
            <AddAdminPromocodeModal 
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                onChange={getPromocodes}
            />
        </TableContainer>
    )
}