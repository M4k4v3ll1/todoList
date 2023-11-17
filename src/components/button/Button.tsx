import React, {FC} from 'react';

type ButtonPropsType = {
    name: string
    onClick?: () => void
}

export const Button: FC<ButtonPropsType> = ({name, onClick}) => {
    return (
        <button onClick={onClick} >
            {name}
        </button>
    );
};
