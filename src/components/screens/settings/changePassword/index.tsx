import IChangePassword from './changePassword.interface';
import ChangePasswordLogic from './changePassword.logic';
import { ScrollFrame } from '@/components/atoms/frame';
import InnerHeader from '@/components/molecules/header/inner';
import Separator from '@/components/atoms/separator';
import ChangePasswordForm from '@/components/molecules/form/changePassword';
import { View, StyleSheet } from 'react-native';

export default function ChangePassword(props: IChangePassword) {
  const {} = props;
  const {} = ChangePasswordLogic();
  return (
    <View style={styles.container}>
      <ScrollFrame>
        <InnerHeader label="Change Password" gobackLabel="Back" />
        <Separator />
        <ChangePasswordForm />
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
