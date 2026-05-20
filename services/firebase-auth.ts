import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import app from './firebase-config';
import { createWithId } from './firebase-database.web';

const auth = getAuth(app);

export default auth;

export const signup = async (email:string, password:string, nickname: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    const uid = result?.user?.uid;
    if(uid) {
      await createWithId("users",uid, {uid: uid, nickname:  nickname});  
    }
    // console.log("./services/firebase-auth.ts - signup function - SUCCESS", result);
    return result;  
  } catch(err) {
    console.log("./services/firebase-auth.ts - signup function - ERROR : ", err);
    return err;
  }
 
};

export const login = async (email:string, password:string): Promise<{success: any, error: any}> => {
  try {
    const result =  await signInWithEmailAndPassword(auth, email, password);
    // console.log("./services/firebase-auth.ts - login function - SUCCESS", result);
    return {success:result, error: false};
  } catch(err) {
    console.log("./services/firebase-auth.ts - login function - ERROR : ", err);
    return {success:false, error: err};
  }
};

export const logout = async () => {
  console.log("./services/firebase-auth.ts - logout function");
  try {
    await signOut(auth);
    return "success";
  } catch(err) {
    console.log("./services/firebase-auth.ts - logout function - ERROR : ", err);
    return err;
  }
 
};


