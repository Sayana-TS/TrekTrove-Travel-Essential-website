import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsRbuTD6-yHTbfUdiQ5eV6IDOWekZ693s",
  authDomain: "trendtrove-e-commerce-site.firebaseapp.com",
  projectId: "trendtrove-e-commerce-site",
  storageBucket: "trendtrove-e-commerce-site.appspot.com",
  messagingSenderId: "762483856291",
  appId: "1:762483856291:web:09220af48b656368eb8016"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize individual services
const auth = getAuth(app)
const db = getFirestore(app)

export {auth, db}