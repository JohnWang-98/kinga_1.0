import IControls from './controls.interface';
import ControlsLogic from './controls.logic';
import { ScrollFrame } from '@/components/atoms/frame';
import Separator from '@/components/atoms/separator';
import InnerHeader from '@/components/molecules/header/inner';
import Options from '@/components/molecules/options';
import { controlsOptions, actionLabels } from '@/lib/constants';
import { StyleSheet, View } from 'react-native';
import { getLocalData } from '@/lib/helpers/localStorage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import CustomText from '@/components/atoms/customText';

export default function Controls(props: IControls) {
  const {} = props;
  const { handleBack } = ControlsLogic();
  const [loadedOptions, setLoadedOptions] = useState([]);
  const navigation = useNavigation();

  // Use useFocusEffect to refresh the UI when the screen is focused
  useFocusEffect(
    useCallback(() => {
      // Logic to refresh UI or fetch new data
      getOptionsFromStorage();

      // Optionally, return a cleanup function
      return () => {
        console.log('Screen is unfocused');
      };
    }, []),
  );

  const getOptionsFromStorage = async () => {
    const loadedOptionsData = {};

    for (const option of controlsOptions) {
      const storedOption = await getLocalData(option.id); // Get saved data per control option by its ID
      loadedOptionsData[option.id] = storedOption;
    }
    setLoadedOptions(loadedOptionsData); // Store the loaded options in state
  };

  return (
    <View style={styles.container}>
      <ScrollFrame>
        <InnerHeader label="Controls" gobackLabel="Decoy App" />
        <Separator />
        <Options
          options={controlsOptions.map(option => ({
            ...option,
            rightChildren: () => (
              <CustomText>
                {loadedOptions[option.id] !== null &&
                loadedOptions[option.id] !== undefined
                  ? `${actionLabels[loadedOptions[option.id]]}`
                  : 'None'}
              </CustomText>
            ),
            onPress: () => navigation.navigate('ControlOptions', { option }),
          }))}
        />
      </ScrollFrame>
    </View>
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
