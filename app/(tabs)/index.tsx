import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux'

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { RootState } from '@/store';

export default function HomeScreen() {
  const uid = useSelector((state: RootState) => state.user.uid)
  


  useEffect(() => {
    loadImages({uid});
  }, [useSelector]);

  interface LoadImagesParams {
    uid: string
  }

  async function loadImages({uid}: LoadImagesParams) {    
    try {
      console.log(uid);
    } catch (err) {
      console.error('Failed to load images on Home screen:', err);
    }
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.text}>Toutes les photos ici</ThemedText>
    </ThemedView>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
},
text: {
  fontSize: 18,
  fontWeight: 'bold',
  color: 'white',
  textAlign: 'center',
},
});