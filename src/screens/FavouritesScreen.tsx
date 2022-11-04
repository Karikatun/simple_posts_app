import React from 'react';

import PostsList from 'components/posts/List';

import { useAppSelector } from 'redux/hooks';

// Component of screen with booked posts
const FavouritesScreen = ({ navigation }) => {
  const posts = useAppSelector(state => state.posts).filter(
    item => item.booked
  );

  return <PostsList posts={posts} navigation={navigation} />;
};

export default FavouritesScreen;
