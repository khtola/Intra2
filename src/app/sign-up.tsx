import { useAuth, useSignUp } from '@clerk/expo';
import { type Href, router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

function navigateAfterSignUp(decorateUrl: (path: string) => string) {
  const path = '/(tabs)/home';
  const url = decorateUrl(path);
  if (url.startsWith('http') && Platform.OS === 'web') {
    window.location.href = url;
    return;
  }
  router.replace((url.startsWith('http') ? path : url) as Href);
}

export default function SignUpScreen() {
  const { isLoaded: authLoaded, isSignedIn } = useAuth();
  const { signUp, errors, fetchStatus } = useSignUp();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [genericError, setGenericError] = useState('');

  if (!authLoaded) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator />
      </View>
    );
  }

  if (signUp.status === 'complete' || isSignedIn) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator />
      </View>
    );
  }

  const onSignUpPress = async () => {
    setGenericError('');
    const { error } = await signUp.password({
      emailAddress,
      password,
    });
    if (error) {
      setGenericError(
        typeof error === 'object' && error !== null && 'message' in error
          ? String((error as { message?: string }).message)
          : 'Sign up failed',
      );
      return;
    }

    const sendResult = await signUp.verifications.sendEmailCode();
    if (sendResult.error) {
      setGenericError(
        typeof sendResult.error === 'object' &&
          sendResult.error !== null &&
          'message' in sendResult.error
          ? String((sendResult.error as { message?: string }).message)
          : 'Could not send verification email',
      );
      return;
    }

    const needsEmailVerify =
      signUp.status === 'missing_requirements' &&
      signUp.unverifiedFields.includes('email_address');
    if (!needsEmailVerify && signUp.status !== 'complete') {
      setGenericError(
        `Could not start email verification (status: ${String(signUp.status)}). Check Clerk email settings and enabled sign-up strategies.`,
      );
    }
  };

  const onVerifyPress = async () => {
    setGenericError('');
    await signUp.verifications.verifyEmailCode({
      code,
    });

    if (signUp.status === 'complete') {
      await signUp.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            setGenericError('Your account needs an extra step in Clerk before continuing.');
            return;
          }
          navigateAfterSignUp(decorateUrl);
        },
      });
      return;
    }

    setGenericError('Verification did not complete. Check the code and try again.');
  };

  const showVerify =
    signUp.status === 'missing_requirements' &&
    signUp.unverifiedFields.includes('email_address') &&
    signUp.missingFields.length === 0;

  if (showVerify) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Verify Email</Text>

        <TextInput
          placeholder="Verification code"
          value={code}
          onChangeText={setCode}
          style={styles.input}
          keyboardType="number-pad"
        />

        {errors.fields?.code ? (
          <Text style={styles.error}>{errors.fields.code.message}</Text>
        ) : null}
        {!!genericError && (
          <Text style={styles.error}>{genericError}</Text>
        )}

        <Button
          title="Verify"
          onPress={onVerifyPress}
          disabled={fetchStatus === 'fetching'}
        />
        <View style={styles.spacer} />
        <Button
          title="Resend code"
          onPress={() => void signUp.verifications.sendEmailCode()}
        />

        <Text
          style={styles.link}
          onPress={() => router.push('/sign-in')}
        >
          Already have an account?
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={emailAddress}
        onChangeText={setEmailAddress}
        style={styles.input}
      />
      {errors.fields?.emailAddress ? (
        <Text style={styles.error}>{errors.fields.emailAddress.message}</Text>
      ) : null}

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      {errors.fields?.password ? (
        <Text style={styles.error}>{errors.fields.password.message}</Text>
      ) : null}

      {!!genericError && (
        <Text style={styles.error}>{genericError}</Text>
      )}

      <Button
        title="Create Account"
        onPress={onSignUpPress}
        disabled={
          !emailAddress || !password || fetchStatus === 'fetching'
        }
      />

      <Text
        style={styles.link}
        onPress={() => router.push('/sign-in')}
      >
        Already have an account?
      </Text>

      {/* Required when Clerk bot protection / captcha is enabled (default) */}
      <View nativeID="clerk-captcha" style={styles.captcha} />
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captcha: {
    marginTop: 16,
    minHeight: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  spacer: {
    height: 12,
  },
  title: {
    fontSize: 28,
    marginBottom: 24,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
  },
  error: {
    marginBottom: 12,
    color: '#c00',
  },
  link: {
    marginTop: 16,
    textAlign: 'center',
  },
});
