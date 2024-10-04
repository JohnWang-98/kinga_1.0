/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import App from './src/app';
import {name as appName} from './app.json';
import {API_URL} from '@env';

console.log('API URL:', API_URL);
console.log('APP Name:', appName);


AppRegistry.registerComponent(appName, () => App);
