import { FC } from "react";
import { Menu as MenuItemType } from '../../../../types/domain';
import { Button, Heading, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, UnorderedList } from "@chakra-ui/react";
import { getAllergyType, isGlutenFree, isVegan, isVegeterian } from "../../../../utils/getAllergyType";

type Props = {
    item: MenuItemType | null;
    onClose: () => void;
}

export const MenuItemModal: FC<Props> = ({ item, onClose }) => (
    <Modal isOpen={!!item} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalCloseButton />
            <ModalHeader>{item?.name}</ModalHeader>
            <ModalBody>
                {item?.products.map(({ name }) => name).join(', ')}
                <Text fontWeight="bold">£ {item?.price}</Text>
                <Heading size="sm" mt='24px'>Allergens</Heading>
                <UnorderedList>
                    <ListItem>This menu item is {!isVegan(item?.products || []) && 'NOT'} suitable for vegans</ListItem>
                    <ListItem>This menu item is {!isVegeterian(item?.products || []) && 'NOT'} suitable for vegeterians</ListItem>
                    <ListItem>This menu item is {!isGlutenFree(item?.products || []) && 'NOT'} suitable for people with gluten allergies</ListItem>
                </UnorderedList>
            </ModalBody>
            <ModalFooter>
                <Button width="100%">Add to basket</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
);