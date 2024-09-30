import { View, Text, StyleSheet } from 'react-native';
import IAddText from './addText.interface';
import AddTextLogic from './addText.logic';
import { ScrollFrame } from '@/components/atoms/frame';
import InnerHeader from '@/components/molecules/header/inner';
import Separator from '@/components/atoms/separator';
import CustomizeTextForm from '@/components/molecules/form/customizeText';
import { Fragment } from 'react';
import DefaultSafeAreaView from '../../../atoms/defaultSaveAreaView/DefaultSafeAreaView';

export default function AddText(props: IAddText) {
  const {} = props;
  const {} = AddTextLogic();
  return (
    <DefaultSafeAreaView>
      <ScrollFrame>
        <InnerHeader label="Add Text" gobackLabel="Back" />
        <Separator />
        <View className="bg-black/30 rounded-xl px-3 py-3.5">
          <CustomizeTextForm />
        </View>
      </ScrollFrame>
    </DefaultSafeAreaView>
  );
}
