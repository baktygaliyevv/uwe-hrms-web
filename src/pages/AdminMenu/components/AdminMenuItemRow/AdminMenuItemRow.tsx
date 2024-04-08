import { FC, useCallback, useState } from "react";
import { Menu, MenuCategory } from "../../../../types/domain";
import { Button, IconButton, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, Stack, Td, Tr, useToast } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { menuIdDelete } from "../../../../api/menu/menuIdDelete";
import { AddEditAdminMenuModal } from "../AddEditAdminMenuModal/AddEditAdminMenuModal";

type Props = {
    item: Menu;
    categories: MenuCategory[];
    unavailable: boolean;
    onChange: () => void;
};

export const AdminMenuItemRow: FC<Props> = ({ item, categories, unavailable, onChange }) => {
    const toast = useToast();
    const { id, name, category, products, price } = item;

    const handleDelete = useCallback(() => {
        menuIdDelete(id).then(() => {
            toast({
                title: 'Menu item deleted',
                status: 'success',
                duration: 1000
            });
            onChange();
        }).catch(() => {
            toast({
                title: 'Error deleting menu item',
                status: 'error',
                duration: 2000
            });
        });
    }, [id]);

    const [modalOpen, setModalOpen] = useState(false);

    return (
        <Tr backgroundColor={unavailable ? 'red.100' : undefined}>
            <Td>{id}</Td>
            <Td>{name}</Td>
            <Td>{category.name}</Td>
            <Td>{products.length}</Td>
            <Td>{price}</Td>
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
                            <PopoverHeader>Are you sure?</PopoverHeader>
                            <PopoverBody>
                                <Button colorScheme="red" width="100%" onClick={handleDelete}>I'm 100% sure</Button>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </Stack>
            </Td>
            <AddEditAdminMenuModal 
                item={item}
                categories={categories}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onChange={onChange}
            />
        </Tr>
    )
}