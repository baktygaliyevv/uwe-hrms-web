import { FC, useEffect, useState } from "react";
import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, useToast } from "@chakra-ui/react";
import { tablesPost } from "../../../../api/tables/tablesPost";
import { useRestaurantSelector } from "../../../../components/AdminWrapper/components/RestaurantSelector/RestaurantSelectorProvider";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onChange: () => void;
}

export const AddAdminTableModal: FC<Props> = ({ isOpen, onClose, onChange }) => {
    const toast = useToast();
    const { restaurants, selected } = useRestaurantSelector();

    const [restaurantId, setRestaurantId] = useState(selected.id);
    const [capacity, setCapacity] = useState(2);

    useEffect(() => {
        setRestaurantId(selected.id);
    }, [selected])

    const handleSubmit = () =>
        tablesPost({
            restaurant_id: restaurantId, 
            capacity
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
                <ModalHeader>Add table</ModalHeader>
                <ModalBody>
                    <Text mb="8px">Restaurant:</Text>
                    <Select mb="16px" value={restaurantId} onChange={({ target }) => setRestaurantId(parseInt(target.value))} isDisabled>
                        {restaurants.map(({ id, city }) => <option key={id} value={id}>{city}</option>)}
                    </Select>
                    <Text mb="8px">Capacity:</Text>
                    <Input 
                        type="number" 
                        value={capacity} 
                        onChange={({ target }) => setCapacity(parseInt(target.value))} 
                    />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleSubmit}>Save</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}