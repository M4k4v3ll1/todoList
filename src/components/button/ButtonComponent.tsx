import React, {FC} from 'react';
import {Button} from "@mui/material";

type ButtonPropsType = {
    name: string
    onClick?: () => void
    className?: string
}

export const ButtonComponent: FC<ButtonPropsType> = ({name, onClick, className}) => {
    return (
        <Button
            className={className}
            variant={'contained'}
            color={"primary"}
            onClick={onClick}>
            {name}
        </Button>
    );
};
