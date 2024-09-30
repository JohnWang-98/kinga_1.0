import CustomText from '@/components/atoms/customText';
import { Frame } from '@/components/atoms/frame';
import InnerHeader from '@/components/molecules/header/inner';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation from React Navigation
import { StyleSheet, Text, View } from 'react-native';

export default function NotFoundScreen() {
  const navigation = useNavigation(); // Initialize the navigation hook

  return (
    <Frame>
      <InnerHeader gobackLabel="Back" label="Oops!" />
      <View style={styles.container}>
        <CustomText>This screen doesn't exist. :(</CustomText>
        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.navigate('Home')} // Use navigation.navigate to go back to home screen
        >
          <CustomText>Go to home screen!</CustomText>
        </TouchableOpacity>
      </View>
    </Frame>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
