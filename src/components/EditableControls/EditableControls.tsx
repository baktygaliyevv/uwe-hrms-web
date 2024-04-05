import { ButtonGroup, IconButton } from "@chakra-ui/button";
import { useEditableControls } from "@chakra-ui/editable";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { FC } from "react";

export const EditableControls: FC = () => {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } = useEditableControls();

    return isEditing ? (
        <ButtonGroup justifyContent="center" size="sm">
            <IconButton aria-label="Save" icon={<CheckIcon />} {...getSubmitButtonProps()} />
            <IconButton aria-label="Cancel" icon={<CloseIcon />} {...getCancelButtonProps()} />
        </ButtonGroup>
    ) : (
        <IconButton aria-label="Edit" size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
    );
}