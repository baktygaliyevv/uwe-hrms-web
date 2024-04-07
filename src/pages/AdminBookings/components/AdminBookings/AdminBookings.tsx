import { FC, useCallback, useEffect, useState } from "react";
import { Button, Flex, Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { Booking } from "../../../../types/domain";
import { bookingsGet } from "../../../../api/bookings/bookingsGet";
import { AdminBooking } from "../AdminBooking/AdminBooking";
import { AddEditAdminBookingModal } from "../AddEditAdminBookingModal/AddEditAdminBookingModal";
import { useRestaurantSelector } from "../../../../components/AdminWrapper/components/RestaurantSelector/RestaurantSelectorProvider";

export const AdminBookings: FC = () => {
    const { selected } = useRestaurantSelector();
    const [bookings, setBookings] = useState<Booking[]>([]);

    const getBookings = useCallback(() =>
        bookingsGet().then(({ data }) => setBookings(data.payload)),
    []);

    useEffect(() => {
        getBookings();
    }, []);

    const [openModal, setOpenModal] = useState(false);

    return (
        <TableContainer padding="16px 10%">
            <Flex width="100%" justify="flex-end">
                <Button onClick={() => setOpenModal(true)}>Add booking</Button>
            </Flex>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Client</Th>
                        <Th>Table</Th>
                        <Th>Persons</Th>
                        <Th>Date</Th>
                        <Th>Comment</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {bookings.filter(({ table }) => table.restaurant.id === selected.id)
                        .map((booking) => (
                            <AdminBooking key={booking.id} booking={booking} onChange={getBookings} />
                        )
                    )}
                </Tbody>
            </Table>
            <AddEditAdminBookingModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                onChange={getBookings}
            />
        </TableContainer>
    )
}