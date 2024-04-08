import { FC, useCallback, useEffect, useState } from "react";
import { Menu, MenuCategory, Product } from "../../../../types/domain";
import {
    Button, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, 
    ModalFooter, ModalHeader, ModalOverlay, Popover, PopoverArrow, PopoverBody, 
    PopoverContent, PopoverHeader, PopoverTrigger, Select, Table, TableContainer, 
    Tbody, Td, Text, Th, Thead, Tr, useToast 
} from "@chakra-ui/react";
import { diffObjects } from "../../../../utils/diffObjects";
import { menuIdPatch } from "../../../../api/menu/menuIdPatch";
import { menuPost } from "../../../../api/menu/menuPost";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { productsGet } from "../../../../api/products/productsGet";
import { dumbCompareArrays } from "../../../../utils/dumbCompareArrays";
import { menuIdProductsPost } from "../../../../api/menu/menuIdProductsPost";
import { menuIdProductsIdDelete } from "../../../../api/menu/menuIdProductsIdDelete";

type Props = {
    item?: Menu;
    categories: MenuCategory[];
    isOpen: boolean;
    onClose: () => void;
    onChange: () => void;
}

export const AddEditAdminMenuModal: FC<Props> = ({ item, categories, isOpen, onClose, onChange }) => {
    const toast = useToast();
    const [allProducts, setAllProducts] = useState<Product[]>();

    useEffect(() => {
        productsGet().then(({ data }) => setAllProducts(data.payload));
    }, []);

    const [name, setName] = useState(item?.name || '');
    const [categoryId, setCategoryId] = useState(item?.category.id);
    const [price, setPrice] = useState(item?.price || 0);
    const [products, setProducts] = useState(item?.products || []);

    const handleSubmit = () => {
        if(item) { // patch
            const comparison = diffObjects({
                name,
                category_id: categoryId,
                price
            }, item);
            if(Object.entries(comparison).length) {
                return menuIdPatch(item.id, comparison).then(() => {
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
            }
        }

        return menuPost({
            name,
            category_id: categoryId!,
            price, 
            products: products.map(({ id }) => id)
        }).then(() => {
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
    }

    const handleRemoveProduct = useCallback((id: number) => 
        menuIdProductsIdDelete(item!.id, id).then(() => 
            setProducts((products) => {
                products.splice(products.findIndex((product) => product.id === id), 1);
                return products;
            })
        ), 
    []);

    const [newProduct, setNewProduct] = useState<number>();
    const handleAddProduct = useCallback(() => 
        menuIdProductsPost(item!.id, { product_id: newProduct! }).then(() => 
            setProducts((products) => ([
                ...products,
                allProducts?.find(({ id }) => id === newProduct)!
            ]))
        ),
    [newProduct, allProducts]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>{item ? `Edit menu item #${item.id}` : 'Add menu item'}</ModalHeader>
                <ModalBody>
                    <Text mb="8px">Name:</Text>
                    <Input 
                        mb="16px"
                        value={name} 
                        onChange={({ target }) => setName(target.value)} 
                    />
                    <Text mb="8px">Category:</Text>
                    <Select
                        mb="16px"
                        value={categoryId} 
                        onChange={({ target }) => setCategoryId(parseInt(target.value))}
                    >
                        {categories.map(({ id, name }) => (
                            <option key={id} value={id}>{name}</option>
                        ))}
                    </Select>
                    <Text mb="8px">Price:</Text>
                    <Input 
                        type="number"
                        mb="16px"
                        value={price} 
                        onChange={({ target }) => setPrice(parseInt(target.value))} 
                    />
                    <Text mb="8px">Products:</Text>
                    <TableContainer>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Product</Th>
                                    <Th>Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {products.map(({ id, name }) => (
                                    <Tr key={id}>
                                        <Td>{name}</Td>
                                        <Td>
                                            <Popover>
                                                <PopoverTrigger>
                                                    <IconButton
                                                        aria-label="Delete"
                                                        icon={<DeleteIcon />}
                                                    />
                                                </PopoverTrigger>
                                                <PopoverContent>
                                                    <PopoverArrow />
                                                    <PopoverHeader>Are you sure?</PopoverHeader>
                                                    <PopoverBody>
                                                        <Button 
                                                            colorScheme="red" 
                                                            width="100%" 
                                                            onClick={() => handleRemoveProduct(id)}
                                                        >I'm 100% sure</Button>
                                                    </PopoverBody>
                                                </PopoverContent>
                                            </Popover>
                                        </Td>
                                    </Tr>
                                ))}
                                <Tr>
                                    <Td>
                                        <Select
                                            value={newProduct}
                                            onChange={({ target }) => setNewProduct(parseInt(target.value))}
                                        >
                                            {allProducts?.map(({ id, name }) => (
                                                <option key={id} value={id}>{name}</option>
                                            ))}
                                        </Select>
                                    </Td>
                                    <Td>
                                        <IconButton
                                            aria-label="Add"
                                            icon={<AddIcon />}
                                            onClick={handleAddProduct}
                                        />
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleSubmit}>Save</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}