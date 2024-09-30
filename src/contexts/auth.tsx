import React, { useReducer, createContext } from 'react';
import { signInRequest, signUpRequest } from '@/lib/services/auth';
import { api } from '@/lib/helpers/requestHandler';
import {
  getLocalData,
  saveLocalData,
  clearLocalData,
} from '@/lib/helpers/localStorage';
import { updateProfileRequest } from '@/lib/services/profile';
import { getTokenAndSendToServer } from '@/lib/services/fcm';

// Initial state
const initialState = {
  isLoading: true,
  isAuthenticated: false,
  user: null,
  token: null,
};

// Action types
const AuthActionTypes = {
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
  SIGN_UP: 'SIGN_UP',
  RESTORE_TOKEN: 'RESTORE_TOKEN',
  UPDATE_USER: 'UPDATE_USER',
};

// Reducer
const AuthReducer = (state, action) => {
  switch (action.type) {
    case AuthActionTypes.SIGN_IN:
    case AuthActionTypes.SIGN_UP:
    case AuthActionTypes.UPDATE_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
      };
    case AuthActionTypes.SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        isLoading: false,
      };
    case AuthActionTypes.RESTORE_TOKEN:
      return {
        ...state,
        isAuthenticated: !!action.payload.token,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
      };
    default:
      return state;
  }
};

// Context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Restore token on app load
  React.useEffect(() => {
    const restoreToken = async () => {
      let token;
      try {
        token = await getLocalData('token');
        const user = await getLocalData('user');

        if (token && user) {
          setAxiosAuthHeader(token);
          await getTokenAndSendToServer();
          dispatch({
            type: AuthActionTypes.RESTORE_TOKEN,
            payload: { token, user },
          });
        } else {
          dispatch({
            type: AuthActionTypes.RESTORE_TOKEN,
            payload: { token: null, user: null },
          });
        }
      } catch (e) {
        console.error(e);
      }
    };

    restoreToken();
  }, []);

  const setAxiosAuthHeader = token => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const removeAxiosAuthHeader = () => {
    delete api.defaults.headers.common['Authorization'];
  };

  const authContextValue = {
    state,
    signIn: async (email, password, rememberMe) => {
      try {
        const response = await signInRequest({ email, password });
        if (response.success) {
          const { token, user } = response.data.data;

          setAxiosAuthHeader(token);
          await getTokenAndSendToServer();

          if (rememberMe) {
            await saveLocalData('token', token);
            await saveLocalData('user', user);
            await saveLocalData('rememberMe', rememberMe);
          }

          dispatch({ type: AuthActionTypes.SIGN_IN, payload: { token, user } });
          return true;
        }
      } catch (error) {
        console.error('Sign in error', error);
      }

      return false;
    },
    signUp: async (fullName, email, phone, password) => {
      try {
        const response = await signUpRequest({
          fullName,
          email,
          phone,
          password,
        });

        if (response.success) {
          const { token, user } = response.data.data;

          setAxiosAuthHeader(token);
          await getTokenAndSendToServer();

          await saveLocalData('token', token);
          await saveLocalData('user', user);

          dispatch({ type: AuthActionTypes.SIGN_UP, payload: { token, user } });
          return true;
        }
      } catch (error) {
        console.error('Sign up error', error);
      }
    },
    signOut: async () => {
      try {
        await clearLocalData('token');
        await clearLocalData('user');
        removeAxiosAuthHeader(); // Remove token from headers
        dispatch({ type: AuthActionTypes.SIGN_OUT });
      } catch (error) {
        console.error('Sign out error', error);
      }
    },
    updateProfile: async (fullName, email, phone, isReceiveNotification) => {
      try {
        const response = await updateProfileRequest(
          fullName,
          email,
          phone,
          isReceiveNotification,
        );
        if (response.success) {
          const { token, user } = response.data.data;
          console.log(token, user);

          await saveLocalData('token', token);
          await saveLocalData('user', user);

          dispatch({
            type: AuthActionTypes.UPDATE_USER,
            payload: { token, user },
          });
          return true;
        }
      } catch (error) {
        console.error('Update profile error', error);
      }

      return false;
    },
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
