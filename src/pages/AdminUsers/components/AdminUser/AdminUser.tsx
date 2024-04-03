import { FC, useCallback, useState } from "react";
import { User } from "../../../../types/domain";
import { Button, IconButton, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, Stack, Td, Tr, useToast } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { usersIdDelete } from "../../../../api/users/usersIdDelete";
import { AddEditAdminUserModal } from "../AddEditAdminUserModal/AddEditAdminUserModal";

type Props = {
    user: User;
    onChange: () => void;
};

export const AdminUser: FC<Props> = ({ user, onChange }) => {
    const toast = useToast();
    const { id, first_name, last_name, email, role } = user;

    const handleDelete = useCallback(() => {
        usersIdDelete(id).then(() => {
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
            <Td>{first_name}</Td>
            <Td>{last_name}</Td>
            <Td>{email}</Td>
            <Td>{role}</Td>
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
                            <PopoverHeader>Are you sure you want to delete this user?</PopoverHeader>
                            <PopoverBody>
                                <Button colorScheme="red" width="100%" onClick={handleDelete}>I'm 100% sure</Button>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                    <AddEditAdminUserModal 
                        isOpen={modalOpen} 
                        onClose={() => setModalOpen(false)}
                        onChange={onChange}
                        user={user}
                    />
                </Stack>
            </Td>
        </Tr>
    )
}