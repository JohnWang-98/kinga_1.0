import {sendRequest, HttpMethod} from '../helpers/requestHandler'; // Import sendRequest and HttpMethod from requestHandler module
import {CONTACTS} from '@/lib/config/api';

export const saveContactsRequest = (contacts: []) => {
  return sendRequest(CONTACTS, HttpMethod.POST, {contacts});
};

export const fetchContactsRequest = () => {
  return sendRequest(CONTACTS, HttpMethod.GET);
};
