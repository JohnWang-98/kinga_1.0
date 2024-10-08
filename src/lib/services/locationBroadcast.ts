import { sendRequest, HttpMethod } from '../helpers/requestHandler'; // Import sendRequest and HttpMethod from requestHandler module
import { NOTIFICATIONS, BROADCAST, READ } from '@/lib/config/api';

export const broadcastLocationRequest = (message, latitude, longitude) => {
  return sendRequest(`${NOTIFICATIONS}${BROADCAST}`, HttpMethod.POST, {
    message,
    latitude,
    longitude,
  });
};

export const getBroadcastMessagesRequest = () => {
  return sendRequest(`${NOTIFICATIONS}`, HttpMethod.GET);
};

export const getMoreMessagesRequest = (lastCount, limit) => {
  return sendRequest(
    `${NOTIFICATIONS}/load-more?lastCount=${lastCount}&limit=${limit}`,
    HttpMethod.GET,
  );
};

export const markNotificationReadRequest = notificationId => {
  return sendRequest(
    `${NOTIFICATIONS}/${notificationId}${READ}`,
    HttpMethod.POST,
  );
};

export const deleteNotificationByIdRequest = notificationId => {
  return sendRequest(`${NOTIFICATIONS}/${notificationId}`, HttpMethod.DELETE);
};

export const deleteAllNotificationsRequest = () => {
  return sendRequest(`${NOTIFICATIONS}`, HttpMethod.DELETE);
};
