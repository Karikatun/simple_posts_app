import React, { ReactElement } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { NavigationContainer } from '@react-navigation/native';
import { Pressable } from 'native-base';

import { createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CreatePostScreen from 'screens/CreatePostScreen';
import DetailScreen from 'screens/DetailScreen';
import FavouritesScreen from 'screens/FavouritesScreen';
import HomeScreen from 'screens/HomeScreen';
import SignInScreen from 'screens/SignInScreen';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { removeUser } from 'redux/slices/user';

import { bgColor, bgDark, placeholder } from 'theme/themeConfig';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const horizontalAnimation = {
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({ current, layouts }) => ({
    cardStyle: {
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.width, 0]
          })
        }
      ]
    }
  })
};

const HeaderLeft = ({ navigation }) => (
  <Pressable pl={3} onPress={() => navigation.toggleDrawer()}>
    <MaterialIcon name='menu' size={30} color='black' />
  </Pressable>
);

const HeaderRight = ({ navigation }) => (
  <Pressable pr={3} onPress={() => navigation.navigate('CreatePost')}>
    <MaterialIcon name='add' size={30} color='black' />
  </Pressable>
);

const CustomDrawerContent = (props) => {
  const dispatch = useAppDispatch();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label='Logout' onPress={() => dispatch(removeUser())} />
    </DrawerContentScrollView>
  );
};

const renderHeaderRight = (props, navigation) => (
  <HeaderRight {...props} navigation={navigation} />
);

const renderHeaderLeft = (props, navigation) => (
  <HeaderLeft {...props} navigation={navigation} />
);

const renderTabBarIcon = (color, route) => {
  let iconName;

  if (route.name === 'Home') {
    iconName = 'home';
  } else if (route.name === 'Favourite') {
    iconName = 'star';
  }

  return <MaterialIcon name={iconName} size={25} color={color} />;
};

const renderCustomDrawer = props => (<CustomDrawerContent {...props} />);

const HomeDrawer = () => (
  <Drawer.Navigator screenOptions={{
    headerShown: false,
    drawerActiveBackgroundColor: bgColor,
    drawerActiveTintColor: 'white'
  }}
                    drawerContent={props => renderCustomDrawer(props)}>
    <Drawer.Screen name='HomeTabs'
                   component={HomeTabs}
                   options={{ headerShown: false, title: 'Home' }} />
  </Drawer.Navigator>
);

const HomeTabs = () => (
  <Tab.Navigator initialRouteName='Home'
                 screenOptions={({ route, navigation }) => ({
                   tabBarIcon: ({ color }) => renderTabBarIcon(color, route),
                   tabBarActiveTintColor: bgDark,
                   tabBarInactiveTintColor: placeholder,
                   headerLeft: props => renderHeaderLeft(props, navigation),
                   headerRight: props => renderHeaderRight(props, navigation),
                   headerTitleAlign: 'center',
                   tabBarTestID: `${route.name}Tab`
                 })}>
    <Tab.Screen name='Home' component={HomeScreen} />
    <Tab.Screen name='Favourite' component={FavouritesScreen} />
  </Tab.Navigator>
);

// Компонент AppNavigator
const AppNavigator = (): ReactElement => {
  const { auth } = useAppSelector(state => state.currentUser);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='HomeDrawer'
                       screenOptions={{ headerTitleAlign: 'center', statusBarColor: 'white' }}>
        {auth ? (
          <>
            <Stack.Screen name='HomeDrawer'
                          component={HomeDrawer}
                          options={{ headerShown: false }} />
            <Stack.Screen name='Detail' component={DetailScreen} options={{ headerShown: false, statusBarHidden: true }} />
            <Stack.Screen name='CreatePost' component={CreatePostScreen} />
          </>
        ) : (
          <Stack.Screen name='SignIn' component={SignInScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
