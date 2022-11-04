import * as React from 'react';

import { extendTheme, NativeBaseProvider } from 'native-base';

import { PersistGate } from 'redux-persist/integration/react';

import { persistor, setupStore } from 'redux/store';
import { Provider } from 'react-redux';

import AppNavigator from 'navigation/AppNavigator';

import themeConfig from 'theme/themeConfig';

const theme = extendTheme(themeConfig);

const App = () => (
  <Provider store={setupStore}>
    <PersistGate loading={null} persistor={persistor}>
      <NativeBaseProvider theme={theme}>
        <AppNavigator />
      </NativeBaseProvider>
    </PersistGate>
  </Provider>
);

export default App;
