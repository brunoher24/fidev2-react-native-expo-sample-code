import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TitleContent } from '@/components/title-content';
import { Colors } from '@/constants/theme';
import { login } from '@/services/firebase-auth';

type FormData = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [errorMsg, setErrorMsg] = useState<String>("");

  const onChange = (text: string, key: keyof FormData) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: text,
    }));
  };

  const onSubmit = async () => {
    try {
    const result: {success: any , error: any} = await login(formData.email, formData.password);
      if(result.error) {
        setErrorMsg(result.error.message);
      } else {
        setErrorMsg("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <TitleContent />

      <View style={styles.formContainer}>
        <TextInput
          style={{...styles.formInput, fontStyle: formData.email.length === 0 ? "italic" : "normal"}}
          placeholder="Adresse mail"
          placeholderTextColor={Colors.light.text}
          onChangeText={(text) => onChange(text, 'email')}
          value={formData.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={{...styles.formInput, fontStyle: formData.email.length === 0 ? "italic" : "normal"}}
          placeholderStyle={{fontFamily:"Creepster"}}
          placeholder="Mot de passe"
          placeholderTextColor={Colors.light.text}
          onChangeText={(text) => onChange(text, 'password')}
          value={formData.password}
          secureTextEntry
        />

        <Pressable
          onPress={onSubmit}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: pressed
                ? 'lightgray'
                : 'white',
            },
          ]}
        >
          <ThemedText>Se connecter</ThemedText>
        </Pressable>
        <Link href="/map-modal">
          <ThemedText>Pas encore de compte ?</ThemedText>
      </Link>
      <ThemedView>
          <ThemedText>{errorMsg}</ThemedText>
      </ThemedView>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 80,
    paddingLeft: 20,
    paddingRight: 20
  },

  formContainer: {
    marginTop: 40,
    marginBottom: 40,
  },

  formInput: {
    borderColor: Colors.light.text,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    width: 300,
    color: Colors.light.text,
  },

  button: {
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
});