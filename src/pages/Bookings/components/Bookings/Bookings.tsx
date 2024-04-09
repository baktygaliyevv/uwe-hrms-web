import { FC, useCallback, useEffect, useState } from "react";
import styles from './Bookings.module.css';
import { Heading, Stack, Flex } from "@chakra-ui/layout";
import { BookingClient } from "../../../../types/domain";
import { Loader } from "../../../../components/Loader/Loader";
import { bookingsClientGet } from "../../../../api/bookings/bookingsClientGet";
import { BookingsList } from "../BookingsList/BookingsList";
import { Button } from "@chakra-ui/react";
import { AddBookingModal } from "../AddBookingModal/AddBookingModal";

export const Bookings: FC = () => {
  const [bookings, setBookings] = useState<BookingClient[]>();

  const refetch = useCallback(() => {
    bookingsClientGet().then(({ data }) => setBookings(data.payload));
  }, []);

  useEffect(() => {
    refetch();
  }, []);

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={styles.container}>
      <Heading size="md" mb="16px">Bookings</Heading>
      <Flex width="100%" justifyContent="flex-end">
        <Button onClick={() => setModalOpen(true)}>Add booking</Button>
      </Flex>
      <Stack direction="column">
        {bookings ? (
          <BookingsList bookings={bookings} />
        ) : (
          <Loader />
        )}
      </Stack>
      <AddBookingModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onChange={refetch}
      />
    </div>
  )
};