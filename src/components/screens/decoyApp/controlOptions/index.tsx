import IControlOptions from './controlOptions.interface';
import ControlOptionsLogic from './controlOptions.logic';
import { ScrollFrame } from '@/components/atoms/frame';
import InnerHeader from '@/components/molecules/header/inner';
import Separator from '@/components/atoms/separator';
import { controlOptions } from '@/lib/constants';
import PrimaryButton from '@/components/atoms/buttons/primary';
import { Fragment } from 'react';
import ToggleOptions from '@/components/molecules/options/toggle';
import { View, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native'; // Import useRoute to access route params
import DefaultSafeAreaView from '../../../atoms/defaultSaveAreaView/DefaultSafeAreaView';

export default function ControlOptions(props: IControlOptions) {
  const {} = props;

  const { option } = useRoute().params; // Get the passed option from route params
  const { selectedOption, setSelectedOption, handleSave, loading, handleBack } =
    ControlOptionsLogic();

  return (
    <DefaultSafeAreaView>
      <Fragment>
        <ScrollFrame>
          <InnerHeader
            gobackLabel="Back"
            label={option?.label ?? 'Control Options'} // Use option label or fallback
            onPress={handleBack}
          />
          <Separator />
          <ToggleOptions
            label={`Select an action for the ${option?.label ?? 'option'}`}
            options={controlOptions}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
          <Separator />
        </ScrollFrame>
        <PrimaryButton
          className="absolute bottom-12 left-16 right-16 h-12"
          textClassName="text-sm"
          isLoading={loading}
          label="Save"
          onPress={handleSave}
        />
      </Fragment>
    </DefaultSafeAreaView>
  );
}
