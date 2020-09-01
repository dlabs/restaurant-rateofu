import firebase from 'firebase/app'
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyDAAzv5coi8W_YhIKfvMz8OG9unbZydDTM",
    authDomain: "dlabs-restaurant.firebaseapp.com",
    databaseURL: "https://dlabs-restaurant.firebaseio.com",
    projectId: "dlabs-restaurant",
    storageBucket: "dlabs-restaurant.appspot.com",
    messagingSenderId: "917052895162",
    appId: "1:917052895162:web:44ddaeed3b1a0bd7243783"
};
// Get a Firestore instance
export const db = firebase
    .initializeApp(firebaseConfig)
    .firestore()

    // Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }