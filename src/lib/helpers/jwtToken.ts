import {saveLocalData, getLocalData, clearLocalData} from './localStorage';

export const saveJwtToken = async (token: string) => {
  try {
    await saveLocalData('jwtToken', token);
  } catch (error) {
    console.error('Error saving token', error);
  }
};

export const getJwtToken = async () => {
  try {
    const token = await getLocalData('jwtToken');
    return token;
  } catch (error) {
    console.error('Error fetching token', error);
    return null;
  }
};

export const clearJwtToken = async () => {
  try {
    await clearLocalData('jwtToken');
  } catch (error) {
    console.error('Error clearing token', error);
  }
};
