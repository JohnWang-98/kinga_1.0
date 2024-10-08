import { sendRequest, HttpMethod } from '../helpers/requestHandler'; // Import sendRequest and HttpMethod from requestHandler module
import { SIGNIN, SIGNUP, GOOGLE, APPLE } from '@/lib/config/api';
import { Platform, Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import appleAuth from '@invertase/react-native-apple-authentication';

export const signUpRequest = (userData: any) => {
  return sendRequest(SIGNUP, HttpMethod.POST, userData);
};

export const signInRequest = (userData: any) => {
  return sendRequest(SIGNIN, HttpMethod.POST, userData);
};

export const googleSignInRequest = async () => {
  console.log('Google sign-in start');

  try {
    // Check if Google Play Services are available on Android
    if (Platform.OS === 'android') {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
    }

    // Initiate Google Sign-In process
    const userInfo = await GoogleSignin.signIn();

    // Prepare the payload (Google identity token)
    const payload = {
      token: userInfo.idToken,
    };

    // Call sendRequest
    const response = await sendRequest(GOOGLE, 'POST', payload, {
      'Content-Type': 'application/json',
    });

    if (response.success) {
      console.log('Backend response:', response.data);
      // Handle further application logic with `response.data`
    } else {
      Alert.alert(
        'Google Sign-In Failed',
        response.data || 'An error occurred during the Google Sign-In process.',
      );
    }

    return response;
  } catch (error) {
    Alert.alert(
      'Google Sign-In Failed',
      error.message || 'An error occurred during the Google Sign-In process.',
    );
    // throw error; // Re-throw the error if additional handling is needed
  }
};

export const appleSignInRequest = async () => {
  console.log('Apple sign-in start');

  try {
    // Check if Apple Sign-In is supported before trying to sign in
    if (appleAuth.isSupported) {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      if (!appleAuthRequestResponse.identityToken) {
        throw new Error('Apple Sign-In failed - no identity token returned');
      }

      const { identityToken, fullName, email } = appleAuthRequestResponse;

      // Call your backend with the identityToken to handle authentication
      const response = await appleSignInRequest({
        token: identityToken,
        email,
        fullName,
      });

      console.log('Apple Sign-In success:', response);
    } else {
      // Show an alert if Apple Sign-In is not supported
      Alert.alert(
        'Apple Sign-In Not Supported',
        'Apple Sign-In not supported this device',
      );
    }
  } catch (error) {
    // Show an alert if the sign-in process fails
    Alert.alert(
      'Apple Sign-In Failed',
      error.message || 'An error occurred during the Apple Sign-In process.',
    );
  }
};
