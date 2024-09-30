import React from 'react';
import { View, StyleSheet } from 'react-native';
import IHome from './home.interface';
import HomeLogic from './home.logic';
import DefaultWidget from '../decoyApp/defaultWidget';
import MusicApp from '../decoyApp/musicApp';
import { Colors } from '@/lib/colors';
import { styles } from '@/lib/constants';
import DefaultSafeAreaView from '@/components/atoms/defaultSaveAreaView/DefaultSafeAreaView';

export default function Home(props: IHome) {
  const { isSwitchOn } = HomeLogic();

  return (
    <DefaultSafeAreaView>
      {isSwitchOn ? (
        <View style={styles.fullScreen}>
          <MusicApp />
        </View>
      ) : (
        <DefaultWidget />
      )}
    </DefaultSafeAreaView>
  );
}
