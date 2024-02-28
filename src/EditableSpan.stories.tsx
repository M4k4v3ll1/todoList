import {action} from '@storybook/addon-actions'
import {EditableSpan} from "./components/EditableSpan";

export default {
    title: 'EditableSpan Component',
    component: EditableSpan
}

const changeCallback = action('Value changed')

export const EditableSpanExample = () => {
    return (
        <>
            <EditableSpan title={'Start Value'} onChange={changeCallback}/>
        </>
    )}