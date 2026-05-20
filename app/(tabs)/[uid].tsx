import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useDispatch } from 'react-redux'
import { setUid } from '@/features/userSlice';


export default function UidScreen() {
  const router = useRouter();
  const { uid } = useLocalSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (uid) {
      dispatch(setUid(uid));
      router.replace('(tabs)');
    } 
  }, [uid]);

  return (
    <ThemedView></ThemedView>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
}
});