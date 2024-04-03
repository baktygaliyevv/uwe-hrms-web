import { FC, useState } from "react";
import { Role, User } from "../../../../types/domain";
import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, useToast } from "@chakra-ui/react";
import { ROLES } from "../../../../constants/constants";
import { usersIdPatch } from "../../../../api/users/usersIdPatch";
import { diffObjects } from "../../../../utils/diffObjects";
import { usersPost } from "../../../../api/users/usersPost";

type Props = {
    user?: User;
    isOpen: boolean;
    onClose: () => void;
    onChange: () => void;
}

export const AddEditAdminUserModal: FC<Props> = ({ user, isOpen, onClose, onChange }) => {
    const toast = useToast();

    const [firstName, setFirstName] = useState(user?.first_name || '');
    const [lastName, setLastName] = useState(user?.last_name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<Role>(user?.role || 'client');

    const handleSubmit = () =>
        (user ? usersIdPatch(user.id, diffObjects({
            first_name: firstName, 
            last_name: lastName,
            email,
            ...(password ? { password } : {}),
            role
        }, user)) : usersPost({
            first_name: firstName, 
            last_name: lastName,
            email,
            password,
            role
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
                <ModalHeader>{user ? `Edit user #${user.id}` : 'Add user'}</ModalHeader>
                <ModalBody>
                    <Text mb="8px">First name:</Text>
                    <Input 
                        mb="16px" 
                        value={firstName} 
                        onChange={({ target }) => setFirstName(target.value)} 
                    />
                    <Text mb="8px">Last name:</Text>
                    <Input 
                        mb="16px"  
                        value={lastName} 
                        onChange={({ target }) => setLastName(target.value)} 
                    />
                    <Text mb="8px">Email:</Text>
                    <Input 
                        type="email"
                        mb="16px"
                        value={email} 
                        onChange={({ target }) => setEmail(target.value)} 
                    />
                    <Text mb="8px">Password:</Text>
                    <Input 
                        type="password"
                        placeholder={user ? "Leave blank if you don't want to change the password" : undefined}
                        mb="16px"
                        value={password} 
                        onChange={({ target }) => setPassword(target.value)} 
                    />
                    <Text mb="8px">Role:</Text>
                    <Select value={role} onChange={({ target }) => setRole(target.value as Role)}>
                        {ROLES.map((role) => <option key={role} value={role}>{role}</option>)}
                    </Select>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleSubmit}>Save</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}