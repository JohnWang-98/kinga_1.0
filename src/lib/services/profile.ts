import { sendRequest, HttpMethod } from '../helpers/requestHandler'; // Import sendRequest and HttpMethod from requestHandler module
import * as tokens from '@/lib/helpers/jwtToken'; // Import the tokens module
import { PROFILE, CHANGE_PASSWORD, USER } from '@/lib/config/api';

export const saveFcmTokenRequest = (firebaseToken: String) => {
  return sendRequest(PROFILE, HttpMethod.PUT, { firebaseToken });
};

export const updateProfileRequest = (
  fullName,
  email,
  phone,
  isReceiveNotification,
) => {
  return sendRequest(PROFILE, HttpMethod.PUT, {
    fullName,
    email,
    phone,
    isReceiveNotification,
  });
};

export const changePasswordRequest = (oldPassword, newPassword) => {
  return sendRequest(CHANGE_PASSWORD, HttpMethod.POST, {
    oldPassword,
    newPassword,
  });
};

export const deleteAccountRequest = (reason, additionalInfo) => {
  return sendRequest(USER, HttpMethod.DELETE, { reason, additionalInfo });
};
