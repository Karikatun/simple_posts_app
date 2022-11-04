import React, { useState } from 'react';

import { Button, Center, Input, Text } from 'native-base';
import { isEmpty } from 'validator';

import { updateUser } from 'redux/slices/user';
import { useAppDispatch } from 'redux/hooks';

// Компонент SignInScreen
const SignInScreen = () => {
  const [login, setLogin] = useState('');

  const dispatch = useAppDispatch();

  const loginAction = () => {
    if (!isEmpty(login)) {
      dispatch(updateUser({ auth: true, login }));
    }
  };

  const handleChangeText = text => setLogin(text);

  return (
    <Center flex={1}>
      <Text mb={3}>SignIn</Text>

      <Input value={login}
             onChangeText={handleChangeText}
             mx={5}
             placeholder='username' />

      <Button mt={3} w='90%' onPress={loginAction} bg='bgDark'>
        Login
      </Button>
    </Center>
  );
};

export default SignInScreen;
