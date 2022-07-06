import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';

import * as SecureStore from 'expo-secure-store';

import Navigation from './navigation/Navigation';

export default function App() {
    return (
        <Provider store={store}>
            <Navigation />
        </Provider>
    );
}
