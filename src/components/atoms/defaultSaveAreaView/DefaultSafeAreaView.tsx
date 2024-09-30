import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '@/lib/colors';
import { Platform, StatusBar, SafeAreaView } from 'react-native';

export default DefaultSafeAreaView = ({ style, children, ...props }) => {
  const statusBarHeight =
    Platform.OS === 'android' ? StatusBar.currentHeight : 0;

  // { paddingTop: statusBarHeight }
  return (
    <SafeAreaView style={[styles.container, style]} {...props}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background, // Set your desired default color
    paddingBottom: 60,
    flex: 1,
  },
});
