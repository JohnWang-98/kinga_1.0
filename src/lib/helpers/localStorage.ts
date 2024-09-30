import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveLocalData = async (key: string, value: any) => {
  const jsonValue = JSON.stringify(value);
  try {
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error('Error saving data:', error);
    return false;
  }

  return true;
};

export const getLocalData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const clearLocalData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error clearing token', error);
  }
};
