import { FC, useCallback, useState } from "react";
import { Product } from "../../../../types/domain";
import { Button, Checkbox, IconButton, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, Stack, Td, Tr, useToast } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { productsIdDelete } from "../../../../api/products/productsIdDelete";
import { AddEditAdminProductModal } from "../AddEditAdminProductModal/AddEditAdminProductModal";

type Props = {
    product: Product;
    onChange: () => void;
};

export const AdminProduct: FC<Props> = ({ product, onChange }) => {
    const toast = useToast();
    const { id, name, vegan, vegetarian, gluten_free } = product;

    const handleDelete = useCallback(() => {
        productsIdDelete(id).then(() => {
            toast({
                title: 'User deleted',
                status: 'success',
                duration: 1000
            });
            onChange();
        }).catch(() => {
            toast({
                title: 'Error deleting user',
                status: 'error',
                duration: 2000
            });
        });
    }, [id]);

    const [modalOpen, setModalOpen] = useState(false);

    return (
        <Tr>
            <Td>{id}</Td>
            <Td>{name}</Td>
            <Td><Checkbox isDisabled checked={vegan} /></Td>
            <Td><Checkbox isDisabled checked={vegetarian} /></Td>
            <Td><Checkbox isDisabled checked={gluten_free} /></Td>
            <Td>
                <Stack direction="row">
                    <IconButton
                        aria-label="Edit"
                        icon={<EditIcon />}
                        onClick={() => setModalOpen(true)}
                    />
                    <Popover>
                        <PopoverTrigger>
                            <IconButton
                                aria-label="Delete"
                                icon={<DeleteIcon />}
                            />
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverHeader>Are you sure you want to delete this product?</PopoverHeader>
                            <PopoverBody>
                                <Button colorScheme="red" width="100%" onClick={handleDelete}>I'm 100% sure</Button>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                    <AddEditAdminProductModal 
                        isOpen={modalOpen} 
                        onClose={() => setModalOpen(false)}
                        onChange={onChange}
                        product={product}
                    />
                </Stack>
            </Td>
        </Tr>
    )
}