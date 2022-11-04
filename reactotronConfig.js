import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Config from 'react-native-config';

const reactotron = Reactotron.configure({host: '192.168.1.185'})
  .setAsyncStorageHandler(AsyncStorage)
  .useReactNative()
  .use(reactotronRedux())
  .connect();

export default reactotron;
