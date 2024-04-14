import { FC, useEffect, useState } from "react";
import { Table } from "../../../../types/domain";
import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, Textarea, useToast } from "@chakra-ui/react";
import dayjs from "dayjs";
import { tablesGet } from "../../../../api/tables/tablesGet";
import { bookingsClientPost } from "../../../../api/bookings/bookingsClientPost";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onChange: () => void;
}

export const AddBookingModal: FC<Props> = ({ isOpen, onClose, onChange }) => {
    const toast = useToast();

    const [tables, setTables] = useState<Table[]>();

    useEffect(() => {
        tablesGet().then(({ data }) => setTables(data.payload));
    }, []);

    const [tableId, setTableId] = useState<number>();
    const [persons, setPersons] = useState(2);
    const [date, setDate] = useState(dayjs());
    const [comment, setComment] = useState('');

    const handleSubmit = () =>
        bookingsClientPost({
            table_id: tableId!,
            persons, 
            date: date.toISOString(), 
            comment
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
                <ModalHeader>Add booking</ModalHeader>
                <ModalBody>
                    <Text mb="8px">Table:</Text>
                    <Select 
                        mb="16px" 
                        value={tableId} 
                        onChange={({ target }) => setTableId(parseInt(target.value))}
                    >
                        {tables?.map(({ id, restaurant, capacity }) => (
                            <option key={id} value={id}>{id} at {restaurant.city} ({capacity} seatings)</option>
                        ))}
                    </Select>
                    <Text mb="8px">Persons:</Text>
                    <Input 
                        type="number"
                        mb="16px"
                        value={persons} 
                        onChange={({ target }) => setPersons(parseInt(target.value))} 
                    />
                    <Text mb="8px">Date:</Text>
                    <Input 
                        type="datetime-local"
                        mb="16px"
                        value={date.format('YYYY-MM-DDTHH:mm')} 
                        onChange={({ target }) => setDate(dayjs(target.value))} 
                    />
                    <Text mb="8px">Comment:</Text>
                    <Textarea 
                        value={comment} 
                        onChange={({ target }) => setComment(target.value)} 
                    />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleSubmit}>Save</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}