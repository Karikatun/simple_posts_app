import React, { ReactElement, useEffect, useState } from 'react';

import { Box, Button, Center, Image, Input, Pressable, Text, TextArea, useTheme } from 'native-base';
import { launchImageLibrary } from 'react-native-image-picker';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { nanoid } from 'nanoid/non-secure';
import { useAppDispatch } from 'redux/hooks';

import { addPost, editPost } from 'redux/slices/posts';

// Компонент CreatePostScreen
const CreatePostScreen = ({ route, navigation }) => {
  const { post: { title: pTitle, description: pDescription, image: pImage, id: pId } = {} } = route.params;

  const [title, setTitle] = useState(pTitle || '');
  const [description, setDescription] = useState(pDescription || '');
  const [image, setImage] = useState(pImage || null);

  const dispatch = useAppDispatch();
  const { colors } = useTheme();

  useEffect(() => {
    if (pTitle) navigation.setOptions({ headerTitle: 'Edit post' });
  }, []);

  const createPost = async () => {
    const post = {
      id: pId || nanoid(),
      title,
      description,
      image
    };

    if (pTitle) await dispatch(editPost(post));
    else await dispatch(addPost(post));

    navigation.goBack();
  };

  const handleChangeTitle = text => setTitle(text);
  const handleChangeDescription = text => setDescription(text);

  const pickImage = () => {
    const options: any = {
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    launchImageLibrary(options, (response: any) => {
      if (!response.didCancel && !response.error) {
        setImage(response.assets[0].uri);
      }
    });
  };

  const renderAddImageBlock = () => (
    <Pressable w='100%' onPress={pickImage}>
      {image ? (
        <Image source={{ uri: image }} alt='image' w='100%' h={200} rounded={10} resizeMode='cover' />
      ) : (
        <Center w='100%' h={200} borderWidth={1} borderColor='input' rounded={10}>
          <MaterialIcon name='photo' size={100} color={colors.input} />
          <Text color='input' bold fontSize='lg'>Press here to add photo</Text>
        </Center>
      )}
    </Pressable>
  );

  return (
    <Center flex={1} px={5}>
      {renderAddImageBlock()}
      <Input value={title}
             onChangeText={handleChangeTitle}
             placeholder='title'
             mb={3}
             mt={3} />
      <TextArea value={description}
                autoCompleteType
                onChangeText={handleChangeDescription}
                placeholder='description'
                mb={3} />

      <Button w='95%' onPress={createPost} bg='bgDark'>
        {pTitle ? 'Edit' : 'Create'}
      </Button>
    </Center>
  );
};

export default CreatePostScreen;
