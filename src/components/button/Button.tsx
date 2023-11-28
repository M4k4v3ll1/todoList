import React, {FC} from 'react';

type ButtonPropsType = {
    name: string
    onClick?: () => void
    className?: string
}

export const Button: FC<ButtonPropsType> = ({name, onClick, className}) => {
    return (
        <button
            className={className}
            onClick={onClick} >
            {name}
        </button>
    );
};
