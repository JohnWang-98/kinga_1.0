import axios from 'axios';
import { API_URL } from '@env';
import * as tokens from './jwtToken';

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// api.interceptors.request.use(async config => {
//   // Retrieve token from localStorage
//   const token = await tokens.getJwtToken();

//   if (token) {
//     // Get request headers and if headers is undefined assign blank object
//     // @ts-ignore
//     config.headers = config.headers || {};

//     // Set authorization header
//     // ℹ️ JSON.parse will convert token to string
//     config.headers.Authorization = token ? `Bearer ${token}` : '';
//   }

//   return config;
// });

/**
 * Send http request to api server
 * @param uri
 * @param method
 * @param payload
 * @param headers
 * @param callbackFn
 */
export const sendRequest = (uri, method, payload = {}, headers = {}) => {
  return api
    .request({
      url: `${uri}`,
      headers,
      method,
      data: payload,
    })
    .then(res => ({
      success: true,
      code: res.status,
      data: res.data,
    }))
    .catch(err => {
      if (err.response) {
        return {
          success: false,
          code: err.response.status,
          data: err.response.message,
        };
      }
      return {
        success: false,
        code: 501,
        data: 'The API server is not running now.',
      };
    });
};

// export const fetchMessageData = async () => {
//   try {
//     // Step 1: Retrieve the token
//     const token = await getToken();

//     if (!token) {
//       throw new Error('No token found. Please log in.');
//     }

//     // Step 2: Make the API request with the token in the Authorization header
//     const response = await apiClient.get('/user/messages');
//     console.log(response);

//     // Step 3: Handle the response
//     if (response.status === 200) {
//       // console.log('User data:', response);
//       return response.data;
//     } else {
//       console.error('Failed to fetch user data:', response.status);
//       return null;
//     }
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     return null;
//   }
// };

// export const updateMessageStatus = async (messageId: string, data: any) => {
//   try {
//     const token = await getToken();
//     if (!token) {
//       throw new Error('No token found. Please log in.');
//     }

//     const response = await axios.put(
//       `http://192.168.12.126:3000/api/user/messages/${messageId}`,
//       data,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       },
//     );
//     console.log('updatemessage', response);
//     if (response.status === 200) {
//       return {success: true, data: response.data};
//     } else {
//       return {success: false, message: 'Failed to update message status.'};
//     }
//   } catch (error) {
//     console.error('Error updating message status:', error);
//     return {
//       success: false,
//       message: error.response?.data?.message || 'Something went wrong.',
//     };
//   }
// };

// export const sendMessage = async (message: string) => {
//   try {
//     const token = await getToken();
//     if (!token) {
//       throw new Error('No token found. Please log in.');
//     }

//     // Post message to the server
//     const response = await apiClient.post(
//       '/user/messages',
//       {message},
//       {
//         headers: {
//           Authorization: `Bearer ${token}`, // Attach JWT token to the header
//         },
//       },
//     );

//     if (response.status === 200) {
//       console.log('Message sent successfully:', response.data);
//       return {success: true, data: response.data};
//     } else {
//       console.error('Failed to send message:', response.status);
//       return {success: false, message: 'Failed to send message.'};
//     }
//   } catch (error) {
//     console.error('Error sending message:', error);
//     return {
//       success: false,
//       message: error.response?.data?.message || 'Something went wrong.',
//     };
//   }
// };

// export const sendFcmToken = async (firebaseToken: string) => {
//   try {
//     const token = await getToken();
//     if (!token) {
//       throw new Error('No token found. Please log in.');
//     }

//     const response = await apiClient.put(
//       '/user/profile',
//       {firebaseToken}, // Add FCM token in the request body
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       },
//     );

//     if (response.status === 200) {
//       console.log('FCM Token sent successfully:', response.data);
//       return {success: true, data: response.data};
//     } else {
//       console.error('Failed to send FCM Token:', response.status);
//       return {success: false, message: 'Failed to send FCM Token.'};
//     }
//   } catch (error) {
//     console.error('Error sending FCM Token:', error);
//     return {
//       success: false,
//       message: error.response?.data?.message || 'Something went wrong.',
//     };
//   }
// };
