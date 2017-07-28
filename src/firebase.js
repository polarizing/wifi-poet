// src/firebase.js

import firebase from 'firebase';
import Gathering from './Gathering';
import C from './constants';

firebase.initializeApp(C.firebaseConfigDevelopment);
export const auth = firebase.auth();
export const database = firebase.database();
export default firebase;