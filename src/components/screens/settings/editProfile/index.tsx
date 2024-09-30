import { TouchableOpacity, View, StyleSheet } from 'react-native';
import IEditProfile from './editProfile.interface';
import EditProfileLogic from './editProfile.logic';
import { ScrollFrame } from '@/components/atoms/frame';
import Separator from '@/components/atoms/separator';
import AccountForm from '@/components/molecules/form/account';
import { Avatar } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import InnerHeader from '@/components/molecules/header/inner';
import CustomText from '@/components/atoms/customText';
import PrimaryButton from '@/components/atoms/buttons/primary';
import DefaultSafeAreaView from '../../../atoms/defaultSaveAreaView/DefaultSafeAreaView';

export default function EditProfile(props: IEditProfile) {
  const {} = props;
  const { handlePress } = EditProfileLogic();

  return (
    <DefaultSafeAreaView>
      <ScrollFrame>
        <InnerHeader label="Edit profile" gobackLabel="Back" />
        <Separator />
        <TouchableOpacity>
          <View className="relative items-center">
            <Avatar.Image
              size={120}
              source={require('../../../../assets/images/avatar.png')}
            />
            <View className="absolute bottom-0 right-[33%] rounded-full bg-primary p-2">
              <Feather name="camera" size={17} color="white" />
            </View>
          </View>
        </TouchableOpacity>
        <Separator />
        <AccountForm />
        <Separator />
        <View>
          <CustomText className="font-600 text-base">Delete Account</CustomText>
          <CustomText className="text-muted-foreground">
            Your account will be deleted and you will not be able to recover it
          </CustomText>
          <PrimaryButton
            label="Delete Account"
            textClassName="text-red-500"
            className="bg-red-500/30 mt-4"
            onPress={handlePress}
          />
        </View>
      </ScrollFrame>
    </DefaultSafeAreaView>
  );
}
