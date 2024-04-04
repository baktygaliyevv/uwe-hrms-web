import { FC, useCallback, useEffect, useState } from "react";
import { Button, Flex, Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { AdminUser } from "../AdminUser/AdminUser";
import { User } from "../../../../types/domain";
import { usersGet } from "../../../../api/users/usersGet";
import { AddEditAdminUserModal } from "../AddEditAdminUserModal/AddEditAdminUserModal";

export const AdminUsers: FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    const getUsers = useCallback(() => 
        usersGet().then(({ data }) => setUsers(data.payload)), 
    []);

    useEffect(() => {
        getUsers();
    }, []);

    const [openModal, setOpenModal] = useState(false);

    return (
        <TableContainer padding="16px 10%">
            <Flex width="100%" justify="flex-end">
                <Button onClick={() => setOpenModal(true)}>Add user</Button>
            </Flex>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>First name</Th>
                        <Th>Last name</Th>
                        <Th>Email</Th>
                        <Th>Role</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {users.map((user) => (
                        <AdminUser key={user.id} user={user} onChange={getUsers} />
                    ))}
                </Tbody>
            </Table>
            <AddEditAdminUserModal 
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                onChange={getUsers}
            />
        </TableContainer>
    )
}