import storage from '@react-native-firebase/storage';
import { createWithId } from './firebase-database.native';
import { createRandomId } from './utilities';

export const sendPhoto = async (uid: string, uri: string) => {
    try {
        const id = createRandomId({charsNbr: 28, firstChar: "_"});
        const reference = storage().ref(`users/${uid}/photos/${id}`);
        const infos = await reference.putFile(uri);
        const { bucket, fullPath } = infos.metadata;

        createWithId("images", id, {
            id,
            url: `gs://${bucket}/${fullPath}`,
            lat: 0,
            lng: 0,
            uid: uid
        });

    } catch(err) {
        console.log("@@@@@@@@@@@@@@@@@@@", err);
    }
};