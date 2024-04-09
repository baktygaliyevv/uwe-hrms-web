import { FC, useEffect, useState } from "react";
import styles from './Bookings.module.css';
import { Heading, Stack } from "@chakra-ui/layout";
import { BookingClient } from "../../../../types/domain";
import { Loader } from "../../../../components/Loader/Loader";
import { bookingsClientGet } from "../../../../api/bookings/bookingsClientGet";
import { BookingsList } from "../BookingsList/BookingsList";

export const Bookings: FC = () => {
  const [bookings, setBookings] = useState<BookingClient[]>();

  useEffect(() => {
    bookingsClientGet().then(({ data }) => setBookings(data.payload));
  }, []);

  return (
    <div className={styles.container}>
        <Heading size="md" mb="16px">Bookings</Heading>
        <Stack direction="column">
            {bookings ? (
                <BookingsList bookings={bookings} />
            ) : (
                <Loader />
            )}
        </Stack>
    </div>
  )
};