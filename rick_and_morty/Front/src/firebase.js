import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  let firebaseConfig = {
    apiKey: "AIzaSyDw23eEK3GczAH2X71b77eVwGdViVdB-qI",
    authDomain: "rickandmorty-c69c5.firebaseapp.com",
    projectId: "rickandmorty-c69c5",
    storageBucket: "rickandmorty-c69c5.appspot.com",
    messagingSenderId: "184118299134",
    appId: "1:184118299134:web:0611fa08e0c09d7671d8af",
    measurementId: "G-J1NTMCYDCZ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

 
  export const db = firebase.firestore().collection('favs')

  export const getFavs = (id) => {
    return db.doc(id).get()
        .then(snap => {
          let dataFire = snap.data()
          console.log("FIREBASE",dataFire)
          return snap.data().array
        })
  }

  export const updateDB = (array,id) => {
 
    return db.doc(id).set({array})
  
  }

  export const signOutGoogle = () => {
    firebase.auth().signOut()
  }

  export const loginWithGoogle = () => {
    
    var provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      let user = {
        id: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL
        }

      console.log("USUARIO:",user)
      return user
    }).catch((error) => {
      let errorMessage = error.message;
      console.log("ERROR:",errorMessage)
      return errorMessage
    });
  }
