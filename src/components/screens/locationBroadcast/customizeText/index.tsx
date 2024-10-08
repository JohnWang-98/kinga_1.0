import Options from '@/components/molecules/options';
import ICustomizeText from './customizeText.interface';
import CustomizeTextLogic from './customizeText.logic';
import { ScrollFrame } from '@/components/atoms/frame';
import InnerHeader from '@/components/molecules/header/inner';
import Separator from '@/components/atoms/separator';
import { Text, ActivityIndicator, View, StyleSheet } from 'react-native';
import DefaultSafeAreaView from '../../../atoms/defaultSaveAreaView/DefaultSafeAreaView';

export default function CustomizeText() {
  const {
    isLoading,
    messages,
    error,
    selectedOption,
    setSelectedOptionAndUpdate,
  } = CustomizeTextLogic();

  // Convert messages to options that can be passed to the Options component
  const options = messages.map((msg: any, index: number) => ({
    label: msg.message,
    buttonType: 'option',
    active: msg.active,
    onSelected: setSelectedOptionAndUpdate,
  }));

  // Add the "Add New Message" option to the end
  const addNewMessageOption = {
    label: 'Add New Message',
    buttonType: 'navigation',
    route: 'AddText',
  };

  options.push(addNewMessageOption);

  return (
    <DefaultSafeAreaView>
      <ScrollFrame>
        <InnerHeader label="Customize text" gobackLabel="Back" />
        <Separator />
        {isLoading ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={24} color="white" />
          </View>
        ) : error ? (
          <Text>{error}</Text>
        ) : (
          <Options options={options} selectedOption={selectedOption} />
        )}
      </ScrollFrame>
    </DefaultSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#152e42',
  },
  fullScreen: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1, // Ensure it renders above the tab bar
  },
});
