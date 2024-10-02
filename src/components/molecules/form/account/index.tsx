import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import AccountLogic from './account.logic';
import { Formik } from 'formik';
import EmialIcon from '@/assets/icons/email';
import PrimaryButton from '@/components/atoms/buttons/primary';
import TextInputField from '@/components/atoms/input/textInputField';
import PersonIcon from '@/assets/icons/person';
import PhoneIcon from '@/assets/icons/phone';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation from React Navigation
import { AuthContext } from '@/contexts/auth';
import { useContext, useEffect, useState } from 'react';
import DefaultSafeAreaView from '@/components/atoms/defaultSaveAreaView/DefaultSafeAreaView';

export default function AccountForm() {
  const { isLoading, setIsLoading, ProfileSchema, handleSubmit } =
    AccountLogic();
  const { state } = useContext(AuthContext);
  const navigation = useNavigation(); // Initialize navigation hook

  const [initialValues, setInitialValues] = useState({
    full_name: '',
    phone_number: '',
    email: '',
  });

  useEffect(() => {
    const loadUserInfo = async () => {
      setIsLoading(true);
      if (state.user) {
        setInitialValues({
          full_name: state?.user?.fullName,
          phone_number: state?.user?.phone,
          email: state?.user?.email,
        });
        setIsLoading(false);
      }
    };

    loadUserInfo();
  }, [state.user]);

  return (
    <View>
      <Formik
        validationSchema={ProfileSchema}
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={handleSubmit}>
        {({
          errors,
          values,
          touched,
          handleChange,
          handleSubmit,
          setValues,
          setFieldTouched,
        }) => (
          <View>
            <TextInputField
              icon={<PersonIcon />}
              placeholder="Full name"
              value={values.full_name}
              onChangeText={handleChange('full_name')}
              error={touched.full_name && errors.full_name}
              onBlur={() => setFieldTouched('full_name')}
              touch={touched.full_name}
              viewClassName="bg-white"
            />
            <TextInputField
              icon={<EmialIcon />}
              placeholder="E-mail ID"
              value={values.email}
              onChangeText={handleChange('email')}
              error={touched.email && errors.email}
              onBlur={() => setFieldTouched('email')}
              touch={touched.email}
              inputMode="email"
              viewClassName="bg-white"
            />
            <TextInputField
              icon={<PhoneIcon />}
              placeholder="Phone No."
              value={values.phone_number}
              keyboardType="numeric" // Opens numeric keyboard
              maxLength={14} // Limits the input to 14 characters
              onChangeText={text =>
                handleChange('phone_number')(text.replace(/\D/g, ''))
              } // Replace non-numeric characters
              error={touched.phone_number && errors.phone_number}
              onBlur={() => setFieldTouched('phone_number')}
              touch={touched.phone_number}
              viewClassName="bg-white"
            />
            <View className="flex-row justify-between items-center mb-5">
              <TouchableOpacity
                onPress={() => navigation.navigate('ChangePassword')}>
                <Text className="text-white font-600 text-xs">
                  Change Password
                </Text>
              </TouchableOpacity>
            </View>
            <PrimaryButton
              label="Save"
              isLoading={false}
              onPress={() => handleSubmit()}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}
