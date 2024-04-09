import { FC } from "react";
import dayjs from 'dayjs';
import { BookingClient } from "../../../../types/domain";
import { Card, CardBody, CardHeader, Heading, List, ListItem } from "@chakra-ui/react";

type Props = { bookings: BookingClient[] };

export const BookingsList: FC<Props> = ({ bookings }) => {
    return (
        <>
            {bookings.map(({ id, table, persons, date, comment }) => (
                <Card key={id}>
                    <CardHeader>
                        <Heading size="xs">
                            Booking #{id}
                        </Heading>
                    </CardHeader>
                    <CardBody>
                        <List>
                            <ListItem>Restaurant: {table.restaurant.city}</ListItem>
                            <ListItem>Table: #{table.id}</ListItem>
                            <ListItem>Persons: {persons}</ListItem>
                            <ListItem>Date: {dayjs(date).format('DD.MM.YYYY HH:mm')}</ListItem>
                            <ListItem>Comment: {comment}</ListItem>
                        </List>
                    </CardBody>
                </Card>
            ))}
        </>
    );
}