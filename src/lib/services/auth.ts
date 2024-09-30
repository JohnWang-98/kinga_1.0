import { sendRequest, HttpMethod } from '../helpers/requestHandler'; // Import sendRequest and HttpMethod from requestHandler module
import { SIGNIN, SIGNUP } from '@/lib/config/api';

export const signUpRequest = (userData: any) => {
  return sendRequest(SIGNUP, HttpMethod.POST, userData);
};

export const signInRequest = (userData: any) => {
  return sendRequest(SIGNIN, HttpMethod.POST, userData);
};
