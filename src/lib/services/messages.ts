import {sendRequest, HttpMethod} from '../helpers/requestHandler'; // Import sendRequest and HttpMethod from requestHandler module
import * as tokens from '@/lib/helpers/jwtToken'; // Import the tokens module
import {MESSAGES} from '@/lib/config/api';

export const addMessageRequest = (message: String) => {
  return sendRequest(MESSAGES, HttpMethod.POST, {message});
};

export const fetchMessagesRequest = () => {
  return sendRequest(MESSAGES, HttpMethod.GET);
};

export const deleteMessageRequest = (messageId: String) => {
  return sendRequest(`${MESSAGES}/${messageId}`, HttpMethod.DELETE);
};

export const updateMessageActiveRequest = (
  messageId: String,
  active: Boolean,
) => {
  return sendRequest(`${MESSAGES}/${messageId}`, HttpMethod.PUT, {active});
};
