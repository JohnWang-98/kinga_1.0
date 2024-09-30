import ILocationBroadcast from './locationBroadcast.interface';
import LocationBroadcastLogic from './locationBroadcast.logic';
import { Frame } from '@/components/atoms/frame';
import TabsHeader from '@/components/molecules/header/tabs';
import Options from '@/components/molecules/options';
import { LocationBroadcastOptions } from '@/lib/constants';
import Separator from '@/components/atoms/separator';
import { View, StyleSheet } from 'react-native';
import DefaultSafeAreaView from '@/components/atoms/defaultSaveAreaView/DefaultSafeAreaView';

export default function LocationBroadcast(props: ILocationBroadcast) {
  const {} = props;
  const {} = LocationBroadcastLogic();
  return (
    <DefaultSafeAreaView>
      <TabsHeader label="Location Broadcast" />
      <Frame>
        <Separator />
        <Options options={LocationBroadcastOptions} />
      </Frame>
    </DefaultSafeAreaView>
  );
}
