import React from 'react';

import 'react-native';

import {render, screen, fireEvent, cleanup, waitFor, within} from '@testing-library/react-native';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { extendTheme, NativeBaseProvider, Text } from 'native-base';

import SignInScreen from '../../src/screens/SignInScreen';
import AppNavigator from '../../src/navigation/AppNavigator';

import { setupStore } from '../../src/redux/store';

import themeConfig from '../../src/theme/themeConfig';

const theme = extendTheme(themeConfig);

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

const SignInScreenMock = ({store}) => (
  <Provider store={store}>
    <NativeBaseProvider theme={theme} initialWindowMetrics={inset}>
      <SignInScreen />
    </NativeBaseProvider>
  </Provider>
)

describe('AuthSignInScreen tests', () => {
  afterEach(cleanup)

  const mockStore = configureStore({});

  // it('to match snapshot', async () => {
  //   const store = mockStore({});

  //   render(<SignInScreenMock store={store} />)

  //   expect(screen.toJSON()).toMatchSnapshot();
  // })

  it ('render AuthSignInScreen', async () => {
    const store = mockStore({});

    render(<SignInScreenMock store={store} />)

    await waitFor(() => screen.getByText('SignIn'))
  })

  it ('to render input', async () => {
    const store = mockStore({});

    render(<SignInScreenMock store={store} />)

    const input = await screen.findByTestId('input');

    fireEvent.changeText(input, 'login')
  
    expect(input.props.value).toEqual('login');
  })

  it ('to render button', async () => {
    const store = mockStore({});

    render(<SignInScreenMock store={store} />)

    const button = await screen.findByRole('button');

    expect(button).toBeTruthy();
  })

  it ('to save login to redux',async () => {
    const store = setupStore;

    const login = 'login';

    render(<SignInScreenMock store={store} />)

    const button = await screen.findByRole('button');
    const input = await screen.findByTestId('input');

    fireEvent.changeText(input, login)

    fireEvent.press(button);

    const user = setupStore.getState().currentUser;

    expect(user.login).toEqual(login);
  })

  it ('test nav', async () => {
    const store = mockStore({ currentUser: { auth: true }, posts: [] });

    render(
      <Provider store={store}>
        <NativeBaseProvider theme={theme} initialWindowMetrics={inset}>
          <AppNavigator />
        </NativeBaseProvider>
      </Provider>
    );

    const tab = await screen.getByTestId('HomeTab');

    const text = await within(tab).getByText('Home');

    await waitFor(() => screen.getByTestId('HomeTab'));
    expect(text).toBeDefined();
  })
})
