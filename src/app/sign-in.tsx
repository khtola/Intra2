import { useAuth, useSignIn } from '@clerk/expo';
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

function navigateAfterSignIn(decorateUrl: (path: string) => string) {
  const path = '/(tabs)/home';
  const url = decorateUrl(path);
  if (url.startsWith('http') && Platform.OS === 'web') {
    window.location.href = url;
    return;
  }
  router.replace((url.startsWith('http') ? path : url) as Href);
}

export default function SignInScreen() {
  const { isLoaded: authLoaded } = useAuth();
  const { signIn, errors, fetchStatus } = useSignIn();

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

  const onSignInPress = async () => {
    setGenericError('');
    const { error } = await signIn.password({
      emailAddress,
      password,
    });
    if (error) {
      setGenericError(
        typeof error === 'object' && error !== null && 'message' in error
          ? String((error as { message?: string }).message)
          : 'Sign in failed',
      );
      return;
    }

    if (signIn.status === 'complete') {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            setGenericError('Your account needs an extra step in Clerk before continuing.');
            return;
          }
          navigateAfterSignIn(decorateUrl);
        },
      });
      return;
    }

    if (signIn.status === 'needs_client_trust') {
      const emailCodeFactor = signIn.supportedSecondFactors?.find(
        (factor) => factor.strategy === 'email_code',
      );
      if (emailCodeFactor) {
        await signIn.mfa.sendEmailCode();
      }
      return;
    }

    if (signIn.status === 'needs_second_factor') {
      setGenericError(
        'This account uses two-factor authentication. Add an MFA step in the app or disable MFA in the Clerk dashboard for testing.',
      );
      return;
    }

    setGenericError(`Sign-in could not complete (status: ${String(signIn.status)}).`);
  };

  const onVerifyPress = async () => {
    setGenericError('');
    await signIn.mfa.verifyEmailCode({ code });

    if (signIn.status === 'complete') {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            setGenericError('Your account needs an extra step in Clerk before continuing.');
            return;
          }
          navigateAfterSignIn(decorateUrl);
        },
      });
      return;
    }

    setGenericError('Verification did not complete. Check the code and try again.');
  };

  if (signIn.status === 'needs_client_trust') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Verify your account</Text>

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
          onPress={() => void signIn.mfa.sendEmailCode()}
        />
        <View style={styles.spacer} />
        <Button title="Start over" onPress={() => signIn.reset()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={emailAddress}
        onChangeText={setEmailAddress}
        style={styles.input}
      />
      {errors.fields?.identifier ? (
        <Text style={styles.error}>{errors.fields.identifier.message}</Text>
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
        title="Sign In"
        onPress={onSignInPress}
        disabled={
          !emailAddress || !password || fetchStatus === 'fetching'
        }
      />

      <Text
        style={styles.link}
        onPress={() => router.push('/sign-up')}
      >
        Create Account
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
