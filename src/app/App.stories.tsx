import {action} from '@storybook/addon-actions'
import App from "./App";
import {ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";


export default {
    title: 'TODOLISTS/App Component',
    component: App,
    decorators: [ReduxStoreProviderDecorator],
    tags: ['autodocs']
}

const changeCallback = action('Value changed')

export const AppExample = () => {
    return (
        <App/>
    )
}