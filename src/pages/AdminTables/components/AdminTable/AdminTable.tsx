import { FC, useCallback, useState } from "react";
import { Table } from "../../../../types/domain";
import { Button, Editable, EditableInput, EditablePreview, IconButton, Input, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, Td, Tr, useToast } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { tablesIdDelete } from "../../../../api/tables/tablesIdDelete";
import { EditableControls } from "../../../../components/EditableControls/EditableControls";
import { tablesIdPatch } from "../../../../api/tables/tablesIdPatch";

type Props = {
    table: Table;
    onChange: () => void;
};

export const AdminTable: FC<Props> = ({ table, onChange }) => {
    const toast = useToast();
    const { id, restaurant, capacity: initCapacity } = table;
    const { city } = restaurant;

    const [capacity, setCapacity] = useState(initCapacity);

    const handleEdit = useCallback(() => {
        tablesIdPatch(id, {
            capacity
        }).then(() => {
            toast({
                title: `Successfuly edited capacity for table #${id}`,
                status: 'success',
                duration: 1000
            });
            onChange();
        }).catch(() => {
            toast({
                title: 'Error editing table',
                status: 'error',
                duration: 2000
            });
            setCapacity(initCapacity); // reset capactity back to api one
        })
    }, [id, capacity, initCapacity]);

    const handleDelete = useCallback(() => {
        tablesIdDelete(id).then(() => {
            toast({
                title: 'Table deleted',
                status: 'success',
                duration: 1000
            });
            onChange();
        }).catch(() => {
            toast({
                title: 'Error deleting table',
                status: 'error',
                duration: 2000
            });
        });
    }, [id]);

    return (
        <Tr>
            <Td>{id}</Td>
            <Td>{city}</Td>
            <Td>
                <Editable
                    value={capacity.toString()}
                    onChange={(value) => setCapacity(parseInt(value))}
                    onSubmit={handleEdit}
                    isPreviewFocusable={false}
                    display="flex"
                    gap="16px"
                >
                    <EditablePreview />
                    <Input type="number" maxW="64px" as={EditableInput} />
                    <EditableControls />
                </Editable>
            </Td>
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
                        <PopoverHeader>Are you sure you want to delete this table?</PopoverHeader>
                        <PopoverBody>
                            <Button colorScheme="red" width="100%" onClick={handleDelete}>I'm 100% sure</Button>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </Td>
        </Tr>
    )
}