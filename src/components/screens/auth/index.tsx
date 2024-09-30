import { useNavigation } from '@react-navigation/native'; // Import useNavigation from React Navigation
import IAuth from './auth.interface';
import AuthLogic from './auth.logic';
import Tabs from '@/components/molecules/tab';
import GoBack from '@/components/atoms/buttons/goBack';
import TabsTrigger from '@/components/atoms/tabs/trigger';
import TabsContent from '@/components/atoms/tabs/content';
import SignInForm from '@/components/molecules/form/signIn';
import SignUpForm from '@/components/molecules/form/signUp';
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { ScrollFrame } from '@/components/atoms/frame';
import React, { useEffect, useState } from 'react';
import { getLocalData } from '@/lib/helpers/localStorage';
import DefaultSafeAreaView from '@/components/atoms/defaultSaveAreaView/DefaultSafeAreaView';

export default function Auth(props: IAuth) {
  const {} = props;
  const { statusBarHeight } = AuthLogic();
  const navigation = useNavigation(); // Initialize navigation hook
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const checkFirstLaunch = async () => {
      const hasLaunched = await getLocalData('hasLaunched');

      if (hasLaunched === null) {
        setIsFirstLaunch(true); // First time launching
      } else {
        setIsFirstLaunch(false); // Already launched before
      }
    };

    checkFirstLaunch();
  }, []);

  const handleGoBack = () => {
    if (navigation.canGoBack()) navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <DefaultSafeAreaView
          className="flex-1"
          style={{ paddingTop: statusBarHeight }}>
          <Image
            className="w-full absolute"
            source={require('../../../assets/images/header-bg.png')}
          />

          <View className="flex-1 ">
            <View className="px-frame-padding">
              <GoBack onPress={handleGoBack} />
              <Text className="my-14 font-600 text-2xl text-white w-[80%]">
                Go ahead and set up your account
              </Text>
            </View>

            <View className="flex-1 bg-white rounded-t-[38px] py-6 px-5">
              <ScrollFrame className="bg-white">
                <Tabs defaultValue="login">
                  <TabsTrigger value="login" title="Login" />
                  <TabsTrigger value="register" title="Register" />
                  <TabsContent value="login">
                    <SignInForm />
                  </TabsContent>
                  <TabsContent value="register">
                    <SignUpForm />
                  </TabsContent>
                </Tabs>
              </ScrollFrame>
            </View>
          </View>
        </DefaultSafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
