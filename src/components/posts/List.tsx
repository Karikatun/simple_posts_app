import React, { ReactElement } from 'react';

import { Box, Image, Pressable, Text, ZStack } from 'native-base';
import { FlashList } from '@shopify/flash-list';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { toggleBooked } from 'redux/slices/posts';
import { useAppDispatch } from 'redux/hooks';

// Компонент List
const PostsList = ({ posts, navigation }): ReactElement => {
  const dispatch = useAppDispatch();

  const openPost = (post) => {
    navigation.navigate('Detail', { id: post.id });
  };

  const toggleBookedPost = (postId) => {
    dispatch(toggleBooked(postId));
  };

  const renderItem = item => (
    <Pressable onPress={() => openPost(item)}>
      <ZStack mx={5} mt={5} bg='bgDark' rounded={10} h={200} overflow='hidden'>
        <Image w='100%' h='100%' source={{ uri: item.image }} alt='image' />
        <Box opacity={0.5} bg='bgDark' w='100%' h='100%' />
        <Box p={5}
             top={0}
             left={0}
             right={0}
             bottom={0}
             justifyContent='space-between'>
          <Box w='100%' alignItems='flex-end'>
            <Pressable p={2} onPress={() => toggleBookedPost(item.id)}>
              <MaterialIcon name={item.booked ? 'star' : 'star-outline'}
                            size={30}
                            color='white' />
            </Pressable>
          </Box>
          <Text color='light' bold fontSize='lg'>
            {item.title}
          </Text>
        </Box>
      </ZStack>
    </Pressable>
  );

  return (
    <Box flex={1}>
      {posts.length === 0 && (
        <Text textAlign='center' mt={5} bold fontSize='xl' color='placeholder'>Create new post</Text>
      )}
      <FlashList data={posts}
                 estimatedItemSize={200}
                 renderItem={({ item }) => renderItem(item)} />
    </Box>
  );
};

export default PostsList;
