import React from 'react';

import PostsList from 'components/posts/List';

import { useAppSelector } from 'redux/hooks';

// Component of home screen with full list of posts
const HomeScreen = ({ navigation }) => {
  const posts = useAppSelector(state => state.posts);

  return <PostsList posts={posts} navigation={navigation} />;
};

export default HomeScreen;
