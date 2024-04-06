import { FC, useCallback, useEffect, useState } from "react";
import { Button, Flex, Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { Product } from "../../../../types/domain";
import { productsGet } from "../../../../api/products/productsGet";
import { AddEditAdminProductModal } from "../AddEditAdminProductModal/AddEditAdminProductModal";
import { AdminProduct } from "../AdminProduct/AdminProduct";

export const AdminProducts: FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    const getProducts = useCallback(() => 
        productsGet().then(({ data }) => setProducts(data.payload)), 
    []);

    useEffect(() => {
        getProducts();
    }, []);

    const [openModal, setOpenModal] = useState(false);

    return (
        <TableContainer padding="16px 10%">
            <Flex width="100%" justify="flex-end">
                <Button onClick={() => setOpenModal(true)}>Add product</Button>
            </Flex>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Name</Th>
                        <Th>Vegan</Th>
                        <Th>Vegetarian</Th>
                        <Th>Gluten free</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {products.map((product) => (
                        <AdminProduct key={product.id} product={product} onChange={getProducts} />
                    ))}
                </Tbody>
            </Table>
            <AddEditAdminProductModal 
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                onChange={getProducts}
            />
        </TableContainer>
    )
}