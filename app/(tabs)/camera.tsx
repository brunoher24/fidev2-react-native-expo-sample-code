import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useEffect, useState, useRef } from 'react';
import { sendPhoto } from '@/services/firebase-storage';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import LoadingScreen from '@/components/loading';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';

export default function CameraScreen() {
  const { uid } = useSelector((state: RootState) => state.user);
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [lastPhoto, setLastPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadMsg, setLoadMsg] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();

  useEffect(() => {
    async function getCurrentLocation() {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
    }

    getCurrentLocation();
  }, []);


  useEffect(() => {
    if (!permission || !permission.granted) {
      requestPermission();
    } else {
      console.log("Permission granted", permission);
    }
  }, []);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Pressable onPress={requestPermission}>
          <Text>Permission</Text>
        </Pressable>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function takePhoto() {
    if (!cameraRef.current) return;
    try {
      setLoadMsg('');
      setLoading(true);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
        exif: false,
      });
      setLastPhoto(photo?.uri ?? null);
      setLoading(false);
      
    } catch (err) {
      console.error('Failed to take photo:', err);
      setLoading(false);
    }
  }

  async function sendPhotoToFirebase() {
    if (!lastPhoto) return;
    setLoadMsg('Envoi de la photo...');
    setLoading(true);
    let location = await Location.getCurrentPositionAsync({});
    const {latitude, longitude} = location.coords;
    console.log("latitude", latitude, "longitude", longitude);
    await sendPhoto(uid, lastPhoto, {lat:latitude, lng:longitude});
    setLoading(false);
    router.replace('(tabs)');
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef} />
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>Flip</Text>
        </Pressable>

        <Pressable style={styles.shutterButton} onPress={takePhoto}>
          <View style={styles.shutterInner} />
        </Pressable>

        <View style={styles.button}>
          {lastPhoto ? (
            <Pressable onPress={sendPhotoToFirebase}>
              <Text style={styles.text}>Confirmer</Text>
            </Pressable>

          ) : (
            <View style={{ width: 40 }} />
          )}
        </View>
      </View>
      {loading && <LoadingScreen message={loadMsg} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    position: "relative"
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    position: "relative",
    zIndex: 0,
    height: "100%",
    width: "100%"
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 48,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  shutterButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'white',
  },
});