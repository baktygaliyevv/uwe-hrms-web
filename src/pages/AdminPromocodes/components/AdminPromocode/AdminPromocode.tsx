import { FC, useCallback } from "react";
import { Promocode } from "../../../../types/domain";
import { Button, IconButton, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, Td, Tr, useToast } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { promocodesIdDelete } from "../../../../api/promocodes/promocodesIdDelete";
import dayjs from "dayjs";

type Props = {
    promocode: Promocode;
    onChange: () => void;
};

export const AdminPromocode: FC<Props> = ({ promocode, onChange }) => {
    const toast = useToast();
    const { id, discount, valid_till } = promocode;

    const handleDelete = useCallback(() => {
        promocodesIdDelete(id).then(() => {
            toast({
                title: 'Promocode deleted',
                status: 'success',
                duration: 1000
            });
            onChange();
        }).catch(() => {
            toast({
                title: 'Error deleting promocode',
                status: 'error',
                duration: 2000
            });
        });
    }, [id]);

    return (
        <Tr>
            <Td>{id}</Td>
            <Td>{discount}</Td>
            <Td>{dayjs(valid_till).format('DD.MM.YYYY HH:mm')}</Td>
            <Td>
                <Popover>
                    <PopoverTrigger>
                        <IconButton
                            aria-label="Delete"
                            icon={<DeleteIcon />}
                        />
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverHeader>Are you sure you want to delete this user?</PopoverHeader>
                        <PopoverBody>
                            <Button colorScheme="red" width="100%" onClick={handleDelete}>I'm 100% sure</Button>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </Td>
        </Tr>
    )
}