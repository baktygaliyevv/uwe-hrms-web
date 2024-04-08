import { FC, useCallback, useState } from "react";
import { Booking } from "../../../../types/domain";
import { Button, IconButton, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, Stack, Td, Tr, useToast } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { bookingsIdDelete } from "../../../../api/bookings/bookingsIdDelete";
import dayjs from "dayjs";
import { AddEditAdminBookingModal } from "../AddEditAdminBookingModal/AddEditAdminBookingModal";

type Props = {
    booking: Booking;
    onChange: () => void;
};

export const AdminBooking: FC<Props> = ({ booking, onChange }) => {
    const toast = useToast();
    const { id, user, table, persons, date, comment } = booking;

    const handleDelete = useCallback(() => {
        bookingsIdDelete(id).then(() => {
            toast({
                title: 'Booking deleted',
                status: 'success',
                duration: 1000
            });
            onChange();
        }).catch(() => {
            toast({
                title: 'Error deleting booking',
                status: 'error',
                duration: 2000
            });
        });
    }, [id]);

    const [modalOpen, setModalOpen] = useState(false);

    return (
        <Tr>
            <Td>{id}</Td>
            <Td>{user.first_name} {user.last_name}</Td>
            <Td>{table.id}</Td>
            <Td>{persons}</Td>
            <Td>{dayjs(date).format('DD.MM.YYYY HH:mm')}</Td>
            <Td>{comment}</Td>
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
                    <AddEditAdminBookingModal 
                        isOpen={modalOpen} 
                        onClose={() => setModalOpen(false)}
                        onChange={onChange}
                        booking={booking}
                    />
                </Stack>
            </Td>
        </Tr>
    )
}