import { FC, useCallback, useEffect, useState } from "react";
import { useRestaurantSelector } from "../../../../components/AdminWrapper/components/RestaurantSelector/RestaurantSelectorProvider";
import { Button, Flex, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, Stack, Table, TableContainer, Tbody, Th, Thead, Tr, Input, useToast } from "@chakra-ui/react";
import { Menu, MenuCategory, Product } from "../../../../types/domain";
import { menuGet } from "../../../../api/menu/menuGet";
import { menuCategoriesGet } from "../../../../api/menu/menuCategoriesGet";
import { menuUnavailableGet } from "../../../../api/menu/menuUnavailableGet";
import { AdminMenuItemRow } from "../AdminMenuItemRow/AdminMenuItemRow";
import { AdminMenuCategoryRow } from "../AdminMenuCategoryRow/AdminMenuCategoryRow";
import { menuCategoriesPost } from "../../../../api/menu/menuCategoriesPost";
import { AddEditAdminMenuModal } from "../AddEditAdminMenuModal/AddEditAdminMenuModal";
import { productsGet } from "../../../../api/products/productsGet";

export const AdminMenu: FC = () => {
    const toast = useToast();
    const { selected } = useRestaurantSelector();
    const [products, setProducts] = useState<Product[]>();
    const [menu, setMenu] = useState<Menu[]>();
    const [menuCategories, setMenuCategories] = useState<MenuCategory[]>();
    const [unavailableMenu, setUnavailableMenu] = useState<Menu[]>();

    const handleUpdate = useCallback(() => {
        menuGet().then(({ data }) => setMenu(data.payload));
        menuCategoriesGet().then(({ data }) => setMenuCategories(data.payload));
        menuUnavailableGet(selected.id).then(({ data }) => setUnavailableMenu(data.payload));
    }, []);

    useEffect(() => {
        productsGet().then(({ data }) => setProducts(data.payload));
        menuGet().then(({ data }) => setMenu(data.payload));
        menuCategoriesGet().then(({ data }) => setMenuCategories(data.payload));
    }, []);

    useEffect(() => {
        menuUnavailableGet(selected.id).then(({ data }) => setUnavailableMenu(data.payload));
    }, [selected.id]);

    const [openModal, setOpenModal] = useState(false);

    const [categoryNameValue, setCategoryNameValue] = useState('');

    const handleAddCategory = () => {
        menuCategoriesPost({
            name: categoryNameValue
        }).then(() => {
            toast({
                title: 'Success!',
                status: 'success',
                duration: 1000
            });
            handleUpdate();
        }).catch(() => {
            toast({
                title: 'Error',
                status: 'error',
                duration: 2000
            })
        })
    }

    return (
        <Stack direction="row" padding="16px 10%">
            <TableContainer flex="1 0 70%">
                <Flex width="100%" justify="flex-end">
                    <Button onClick={() => setOpenModal(true)}>Add menu item</Button>
                </Flex>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Name</Th>
                            <Th>Category</Th>
                            <Th>Products</Th>
                            <Th>Price</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {products && menuCategories && menu?.map((item) => (
                            <AdminMenuItemRow 
                                item={item}
                                products={products}
                                categories={menuCategories}
                                unavailable={!!unavailableMenu?.find(({ id }) => item.id === id)}
                                onChange={handleUpdate}
                            />
                        ))}
                    </Tbody>
                </Table>
                {products && menuCategories && (
                    <AddEditAdminMenuModal
                        products={products}
                        categories={menuCategories}
                        isOpen={openModal}
                        onClose={() => setOpenModal(false)}
                        onChange={handleUpdate}
                    />
                )}
            </TableContainer>
            <TableContainer flex="1 0 30%">
                <Flex width="100%" justify="flex-end">
                    <Popover>
                        <PopoverTrigger>
                            <Button>Add menu category</Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverHeader>Category name</PopoverHeader>
                            <PopoverBody>
                                <Stack direction="column">
                                    <Input 
                                        mb="8px"
                                        value={categoryNameValue}
                                        onChange={({ target }) => setCategoryNameValue(target.value)}
                                    />
                                    <Button onClick={handleAddCategory}>Add</Button>
                                </Stack>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </Flex>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Name</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {menuCategories?.map((category) => (
                            <AdminMenuCategoryRow 
                                category={category}
                            />
                        ))}
                    </Tbody>
                </Table>    
            </TableContainer>
        </Stack>
    )
}