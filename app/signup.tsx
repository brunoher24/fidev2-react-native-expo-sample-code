import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TitleContent } from '@/components/title-content';
import { Colors } from '@/constants/theme';
import { signup } from '@/services/firebase-auth';


type FormData = {
  email: string;
  password: string;
  confirm: string;
  nickname: string;
};

type FormErrors = {
  email: string;
  password: string[];
  confirm: string;
  nickname: string;
};

export default function SignupScreen() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirm: '',
    nickname: ''
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: '',
    password: [],
    confirm: '',
    nickname: ''
  });

  const onChange = (text: string, key: keyof FormData) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: text,
    }));

    if (key === 'password') {
      handlePasswordError(text);
    }

    if (key === 'confirm') {
      handleConfirmError(text);
    }

    if(key === 'nickname') {
      handleNicknameError(text);
    }
  };

  const onSubmit = () => {
    const emailHasError = handleEmailError();

    if (
      emailHasError ||
      formErrors.password.length > 0 ||
      formErrors.confirm.length > 0,
      formErrors.nickname.length > 0
    ) {
      return;
    }

    signup(formData.email, formData.password, formData.nickname);
   
  };

  const handleEmailError = () => {
    let msg = '';

    if (formData.email === '') {
      msg = "L'adresse mail est obligatoire";
    } else if (!formData.email.includes('@')) {
      msg = "L'adresse mail n'est pas valide";
    }

    setFormErrors((prevState) => ({
      ...prevState,
      email: msg,
    }));

    return msg.length > 0;
  };

  const handlePasswordError = (pwd: string) => {
    const msgs: string[] = [];

    if (pwd.length < 8) {
      msgs.push(
        'Le mot de passe doit contenir au moins 8 caractères'
      );
    }

    if (!pwd.match(/[a-z]/)) {
      msgs.push(
        'Le mot de passe doit contenir au moins une lettre minuscule'
      );
    }

    if (!pwd.match(/[A-Z]/)) {
      msgs.push(
        'Le mot de passe doit contenir au moins une lettre majuscule'
      );
    }

    if (!pwd.match(/[0-9]/)) {
      msgs.push(
        'Le mot de passe doit contenir au moins un chiffre'
      );
    }

    if (!pwd.match(/[^a-zA-Z0-9]/)) {
      msgs.push(
        'Le mot de passe doit contenir au moins un caractère spécial'
      );
    }

    setFormErrors((prevState) => ({
      ...prevState,
      password: msgs,
    }));
  };

  const handleConfirmError = (text: string) => {
    if (text !== formData.password) {
      setFormErrors((prevState) => ({
        ...prevState,
        confirm: 'Les mots de passe ne correspondent pas',
      }));
    } else {
      setFormErrors((prevState) => ({
        ...prevState,
        confirm: '',
      }));
    }
  };

  const handleNicknameError = (text: string) => {
    let msg = '';
    if (text.length < 2) {
      msg= 'Pseudo trop court !'
    } else if(text.length > 20) {
      msg = 'Pseudo trop long !';
    }

    setFormErrors((prevState) => ({
      ...prevState,
      confirm: msg,
    }));
  };

  return (
    <ThemedView style={styles.container}>
      <TitleContent />

      <View style={styles.formContainer}>
        <TextInput
          style={styles.formInput}
          placeholder="Adresse mail"
          onChangeText={(text) => onChange(text, 'email')}
          value={formData.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {formErrors.email ? (
          <ThemedText>{formErrors.email}</ThemedText>
        ) : null}

        <TextInput
          style={styles.formInput}
          placeholder="Pseudo"
          onChangeText={(text) => onChange(text, 'nickname')}
          value={formData.nickname}
        />

        {formErrors.nickname ? (
          <ThemedText>{formErrors.nickname}</ThemedText>
        ) : null}

        <TextInput
          style={styles.formInput}
          placeholder="Mot de passe"
          onChangeText={(text) => onChange(text, 'password')}
          value={formData.password}
          secureTextEntry
        />

        {formErrors.password.map((error, index) => (
          <ThemedText key={index}>
            {error}
          </ThemedText>
        ))}

        <TextInput
          style={styles.formInput}
          placeholder="Confirmation mot de passe"
          onChangeText={(text) => onChange(text, 'confirm')}
          value={formData.confirm}
          secureTextEntry
        />

        {formErrors.confirm ? (
          <ThemedText>{formErrors.confirm}</ThemedText>
        ) : null}

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
          <ThemedText>S'inscrire</ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
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