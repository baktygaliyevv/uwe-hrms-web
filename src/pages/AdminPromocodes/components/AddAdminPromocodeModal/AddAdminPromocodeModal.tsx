import { FC, useState } from "react";
import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useToast } from "@chakra-ui/react";
import dayjs from "dayjs";
import { promocodesPost } from "../../../../api/promocodes/promocodesPost";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onChange: () => void;
}

export const AddAdminPromocodeModal: FC<Props> = ({ isOpen, onClose, onChange }) => {
    const toast = useToast();

    const [id, setId] = useState('');
    const [discount, setDiscount] = useState(20);
    const [validTill, setValidTill] = useState(dayjs());

    const handleSubmit = () =>
        promocodesPost({
            id,
            discount,
            valid_till: validTill.toISOString()
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

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>Add promocode</ModalHeader>
                <ModalBody>
                    <Text mb="8px">Promocode:</Text>
                    <Input 
                        mb="16px" 
                        value={id} 
                        onChange={({ target }) => setId(target.value)} 
                    />
                    <Text mb="8px">Discount:</Text>
                    <Input 
                        mb="16px"
                        type="number"
                        value={discount} 
                        onChange={({ target }) => setDiscount(parseInt(target.value))} 
                    />
                    <Text mb="8px">Valid until:</Text>
                    <Input 
                        type="datetime-local"
                        value={validTill.format('YYYY-MM-DDTHH:mm')} 
                        onChange={({ target }) => setValidTill(dayjs(target.value))} 
                    />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleSubmit}>Save</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}