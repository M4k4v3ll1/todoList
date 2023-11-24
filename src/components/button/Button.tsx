import React, {FC} from 'react';

type ButtonPropsType = {
    name: string
    onClick?: () => void
    disabled?: boolean
}

export const Button: FC<ButtonPropsType> = ({name, onClick, disabled}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
        >
            {name}
        </button>
    );
};
