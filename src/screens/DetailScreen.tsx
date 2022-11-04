import React, { useEffect, useState } from 'react';

import { Box, Image, Menu, Pressable, Row, StatusBar, Text } from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { removePost, toggleBooked } from 'redux/slices/posts';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { useFocusEffect } from '@react-navigation/native';

// Компонент DetailScreen
const DetailScreen = ({ route, navigation }) => {
  const [hiddesStatusBar, setHidddenStatusBar] = useState(false);

  const post = useAppSelector(state => state.posts).find(item => item.id === route.params.id) || {};
  const { title, description, id, booked, image } = post;

  const dispatch = useAppDispatch();

  useFocusEffect(() => {
    setHidddenStatusBar(true);

    return () => setHidddenStatusBar(false);
  });

  useEffect(() => {
    navigation.setOptions({
      headerTitle: title,
      headerRight: () => <DeleteButton deletePost={deletePost} />
    });
  }, [post]);

  const deletePost = async () => {
    await dispatch(removePost(id));

    navigation.goBack();
  };

  const toggleBookedPost = () => {
    dispatch(toggleBooked(id));
  };

  const redirectToEdit = () => {
    navigation.navigate('CreatePost', { post });
  };

  const goBack = () => navigation.goBack();

  const renderPostMenu = triggerProps => (
    <Pressable p={3} {...triggerProps}>
      <MaterialIcon name='menu' size={30} color='white' />
    </Pressable>
  );

  const renderHeader = () => (
    <Row position='absolute' top={0} left={0} zIndex={1} w='100%' justifyContent='space-between'>
      <Pressable p={3} onPress={goBack} flex={0}>
        <MaterialIcon name='arrow-back' size={30} color='white' />
      </Pressable>

      <Menu placement='bottom'
            trigger={triggerProps => renderPostMenu(triggerProps)}>
        <Menu.Item onPress={deletePost}>
          <>
            <MaterialIcon name='delete' size={20} color='black' />
            <Text>Delete</Text>
          </>
        </Menu.Item>
        <Menu.Item onPress={() => redirectToEdit()}>
          <>
            <MaterialIcon name='edit' size={20} color='black' />
            <Text>Edit</Text>
          </>
        </Menu.Item>
        <Menu.Item onPress={toggleBookedPost}>
          <>
            <MaterialIcon name={booked ? 'star' : 'star-outline'} size={20} color='black' />
            <Text>Favourite</Text>
          </>
        </Menu.Item>
      </Menu>
    </Row>
  );

  return (
    <Box flex={1}>
      <StatusBar hidden={hiddesStatusBar} />
      {renderHeader()}
      <Box w='100%' h={200} bg='bgDark' mb={10}>
        <Image source={{ uri: image }} w='100%' h='100%' alt='image' />
        <Box position='absolute' opacity={0.5} bg='bgDark' top={0} bottom={0} left={0} right={0} />
      </Box>
      <Text px={5} bold fontSize='2xl' mb={10}>{title}</Text>
      <Text px={5}>{description}</Text>
    </Box>
  );
};

export default DetailScreen;

const DeleteButton = ({ deletePost }) => (
  <Pressable onPress={deletePost}>
    <MaterialIcon name='delete' size={30} color='black' />
  </Pressable>
);
