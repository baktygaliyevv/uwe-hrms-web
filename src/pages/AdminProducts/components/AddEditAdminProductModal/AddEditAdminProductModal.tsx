import { FC, useState } from "react";
import { Product } from "../../../../types/domain";
import { Button, Checkbox, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useToast } from "@chakra-ui/react";
import { diffObjects } from "../../../../utils/diffObjects";
import { productsIdPatch } from "../../../../api/products/productsIdPatch";
import { productsPost } from "../../../../api/products/productsPost";

type Props = {
    product?: Product;
    isOpen: boolean;
    onClose: () => void;
    onChange: () => void;
}

export const AddEditAdminProductModal: FC<Props> = ({ product, isOpen, onClose, onChange }) => {
    const toast = useToast();

    const [name, setName] = useState(product?.name || '');
    const [vegan, setVegan] = useState(product?.vegan || false);
    const [vegetarian, setVegetarian] = useState(product?.vegetarian || false);
    const [glutenFree, setGlutenFree] = useState(product?.gluten_free || false);

    const handleSubmit = () =>
        (product ? productsIdPatch(product.id, diffObjects({
            name, 
            vegan, 
            vegetarian,
            gluten_free: glutenFree
        }, product)) : productsPost({
            name,
            vegan, 
            vegetarian, 
            gluten_free: glutenFree
        })).then(() => {
            toast({
                title: 'Success!',
                status: 'success',
                duration: 1000
            });
            onChange();
            onClose();
        }).catch(() => {
            toast({
                title: 'Error',
                status: 'error',
                duration: 2000
            });
            onClose();
        });

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>{product ? `Edit product #${product.id}` : 'Add product'}</ModalHeader>
                <ModalBody>
                    <Text mb="8px">Name:</Text>
                    <Input 
                        mb="16px" 
                        value={name} 
                        onChange={({ target }) => setName(target.value)} 
                    />
                    <Stack direction="column">
                        <Checkbox 
                            mb="8px" 
                            isChecked={vegan} 
                            onChange={({ target }) => setVegan(target.checked)}
                        >Vegan</Checkbox>
                        <Checkbox 
                            mb="8px" 
                            isChecked={vegetarian}
                            onChange={({ target }) => setVegetarian(target.checked)}
                        >Vegetarian</Checkbox>
                        <Checkbox 
                            isChecked={glutenFree}
                            onChange={({ target }) => setGlutenFree(target.checked)}
                        >Gluten free</Checkbox>
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleSubmit}>Save</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}