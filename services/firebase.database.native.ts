import database from '@react-native-firebase/database';
import app from './firebase-config';
import type { DatabaseService } from './firebase-database.types';
const db = database(app, 'https://em-fidev2-05-2026-default-rtdb.europe-west1.firebasedatabase.app');

export const createWithId: DatabaseService['createWithId'] = (path: string, id: string, data: any): Promise<any> => {
  console.log("### createWithId called", path, id); // ← ajoute ça
  return new Promise((resolve, reject) => {

    console.log("### db instance", db.app.name);
    console.log("### db ref", db.ref(`images/2Fvuz0fFH2giZqnC4y0xLUrxX1J3`).toString());
    database().ref(`${path}/${id}`).set(data)
      .then(() => {
        console.log("### set success"); // ← et ça
        resolve("success");
      })
      .catch(err => {
        console.log("### set error", err); // ← et ça
        reject({ err, error: "error" });
      });
  });
};

export const getById: DatabaseService['getById'] = (path: string, id: string): Promise<any> => {
  return db.ref(`/${path}/${id}`).once('value').then(snap => snap.val());
};