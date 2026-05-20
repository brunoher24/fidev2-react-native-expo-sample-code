import { initializeApp, getApps, getApp } from 'firebase/app';


  const firebaseConfig: any = {
    apiKey: "VOTRE_API_KEY",
    authDomain: "VOTRE_AUTH_DOMAIN.firebaseapp.com",
    projectId: "VOTRE_PROJECT_ID",
    storageBucket: "VOTRE_AUTH_DOMAIN.firebasestorage.app",
    messagingSenderId: "1013814076697",
    appId: "VOTTRE_ APPID" ,
    databaseURL: "VOTRE_DATABASE_URL"
  };


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export default app;