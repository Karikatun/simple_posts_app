import React, { memo, ReactElement, useCallback, useEffect, useState } from 'react';

import { Box, Image, Pressable, Text, ZStack } from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { FlatList } from 'react-native';
import { toggleBooked } from 'redux/slices/posts';
import { useAppDispatch } from 'redux/hooks';

import reactotron from 'reactotron-react-native';

// Компонент List
const PostsList = ({ posts, navigation }): ReactElement => {
  const [visibleItems, setVisibleItems] = useState([]);

  const handleListItemsChange = useCallback((props) => {
    reactotron.log(props);
    setVisibleItems(props.viewableItems);
  }, []);

  const isItemVisible = useCallback(post => visibleItems.findIndex(item => item.key === post.id) !== -1, [visibleItems]);

  return (
    <Box flex={1}>
      <FlatList data={posts}
                onViewableItemsChanged={handleListItemsChange}
                ListEmptyComponent={<Text textAlign='center' mt={5} bold fontSize='xl' color='placeholder'>Create new post</Text>}
                renderItem={({ item }) => <PostItem post={item} navigation={navigation} isVisible={isItemVisible(item)} />} />
    </Box>
  );
};

export default PostsList;

const PostItem = memo(({ post, navigation, isVisible }) => {
  const [isVisibleState, setIsVisibleState] = useState(false);
  reactotron.log(post.id, isVisible)
  const { id, image, booked, title } = post;

  const fetchImage = async () => {
    const response = new Promise((resolve) => {
      setTimeout(() => resolve(isVisible), 500);
    });

    response.then((resp) => {
      reactotron.log('response then', resp);
      setIsVisibleState(resp);
    });
  };

  const dispatch = useAppDispatch();

  const openPost = () => {
    navigation.navigate('Detail', { id });
  };

  const toggleBookedPost = () => {
    dispatch(toggleBooked(id));
  };

  useEffect(() => {
    fetchImage();
  }, [isVisible]);

  return (
    <Pressable onPress={openPost}>
      <ZStack mx={5} mt={5} bg='bgDark' rounded={10} h={200} overflow='hidden'>
        {isVisibleState && <Image w='100%' h='100%' source={{ uri: image }} alt='image' />}
        <Box opacity={0.5} bg='bgDark' w='100%' h='100%' />
        <Box p={5}
             top={0}
             left={0}
             right={0}
             bottom={0}
             justifyContent='space-between'>
          <Box w='100%' alignItems='flex-end'>
            <Pressable p={2} onPress={() => toggleBookedPost(id)}>
              <MaterialIcon name={booked ? 'star' : 'star-outline'}
                            size={30}
                            color='white' />
            </Pressable>
          </Box>
          <Text color='light' bold fontSize='lg'>
            {title}
          </Text>
        </Box>
      </ZStack>
    </Pressable>
  );
});
