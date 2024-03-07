import {action} from '@storybook/addon-actions'
import AppWithRedux from "./AppWithRedux";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";


export default {
    title: 'TODOLISTS/AppWithRedux Component',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator],
    tags: ['autodocs']
}

const changeCallback = action('Value changed')

export const AppWithReduxExample = () => {
    return (
        <AppWithRedux/>
    )
}