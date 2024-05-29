// firebaseConfig.ts

import * as admin from 'firebase-admin';
import * as firebaseAdmin from 'firebase-admin';

// Initialize Firebase SDK
const firebaseServiceAccount = require('../ebuddy-f613f-firebase-adminsdk-j49ms-1f86777f30.json');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseServiceAccount),
  databaseURL: 'https://ebuddy-f613f.firebaseio.com'
});


const db = admin.firestore();
export default db;
