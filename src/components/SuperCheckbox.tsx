import React, {ChangeEvent} from 'react';
import {Checkbox} from "@mui/material";

type SuperCheckboxPropsType = {
    callback: (isDone: boolean) => void
    checked: boolean
}

export const SuperCheckbox: React.FC<SuperCheckboxPropsType> = ({
                                                                    callback,
                                                                    checked
                                                                }) => {
    const onSuperCheckboxClick = (e: ChangeEvent<HTMLInputElement>) => {
        callback(e.currentTarget.checked)
    }
    return (
        <Checkbox
            onChange={onSuperCheckboxClick}
            checked={checked}
        />
    );
};
