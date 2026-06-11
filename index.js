/**
 * @format
 */

import { AppRegistry } from 'react-native';
import notifee from '@notifee/react-native';
import App from './App';
import { name as appName } from './app.json';

notifee.onBackgroundEvent(async ({ type, detail }) => {
  console.log('Background event received: ', type, detail);
});

AppRegistry.registerComponent(appName, () => App);
