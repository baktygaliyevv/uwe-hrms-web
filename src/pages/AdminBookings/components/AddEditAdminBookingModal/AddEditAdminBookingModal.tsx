import { FC, useEffect, useState } from "react";
import { Booking, Table, User } from "../../../../types/domain";
import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, Textarea, useToast } from "@chakra-ui/react";
import { diffObjects } from "../../../../utils/diffObjects";
import dayjs from "dayjs";
import { bookingsIdPatch } from "../../../../api/bookings/bookingsIdPatch";
import { bookingsPost } from "../../../../api/bookings/bookingsPost";
import { tablesGet } from "../../../../api/tables/tablesGet";
import { usersGet } from "../../../../api/users/usersGet";
import { useRestaurantSelector } from "../../../../components/AdminWrapper/components/RestaurantSelector/RestaurantSelectorProvider";

type Props = {
    booking?: Booking;
    isOpen: boolean;
    onClose: () => void;
    onChange: () => void;
}

export const AddEditAdminBookingModal: FC<Props> = ({ booking, isOpen, onClose, onChange }) => {
    const toast = useToast();
    const { selected } = useRestaurantSelector();

    const [tables, setTables] = useState<Table[]>();
    const [users, setUsers] = useState<User[]>();

    useEffect(() => {
        tablesGet().then(({ data }) => setTables(data.payload));
        usersGet().then(({ data }) => setUsers(data.payload));
    }, []);

    const [userId, setUserId] = useState(booking?.user.id);
    const [tableId, setTableId] = useState(booking?.table.id);
    const [persons, setPersons] = useState(booking?.persons || 2);
    const [date, setDate] = useState(dayjs(booking?.date));
    const [comment, setComment] = useState(booking?.comment || '');

    const handleSubmit = () =>
        (booking ? bookingsIdPatch(booking.id, diffObjects({
            table_id: tableId,
            persons,
            date: date.toISOString(),
            comment
        }, {
            ...booking,
            table_id: tableId
        })) : bookingsPost({
            table_id: tableId!,
            user_id: userId,
            persons, 
            date: date.toISOString(), 
            comment
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
                <ModalHeader>{booking ? `Edit booking #${booking.id}` : 'Add booking'}</ModalHeader>
                <ModalBody>
                    <Text mb="8px">Table:</Text>
                    <Select 
                        mb="16px" 
                        value={tableId} 
                        onChange={({ target }) => setTableId(parseInt(target.value))}
                    >
                        {tables?.filter(({ restaurant }) => restaurant.id === selected.id)
                            .map(({ id, capacity }) => 
                                <option key={id} value={id}>{id} ({capacity} seatings)</option>
                        )}
                    </Select>
                    <Text mb="8px">Client:</Text>
                    <Select
                        mb="16px"
                        isDisabled={!!booking}
                        value={userId} 
                        onChange={({ target }) => setUserId(parseInt(target.value))}
                    >
                        {users?.filter(({ role }) => role === 'client')
                            .map(({ id, first_name, last_name }) =>     
                                <option key={id} value={id}>{first_name} {last_name}</option>
                        )}
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