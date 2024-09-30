import {Formik} from 'formik';
import SignUpLogic from './signUp.logic';
import ISignUp from './signUp.interface';
import {View} from 'react-native';
import LockIcon from '@/assets/icons/lock';
import EmialIcon from '@/assets/icons/email';
import PrimaryButton from '@/components/atoms/buttons/primary';
import TextInputField from '@/components/atoms/input/textInputField';
import PersonIcon from '@/assets/icons/person';
import PhoneIcon from '@/assets/icons/phone';

export default function SignUpForm(props: ISignUp) {
  const {} = props;
  const {SignUpSchema, handleSubmit, initialValues, isLoading} = SignUpLogic();

  return (
    <Formik
      validationSchema={SignUpSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}>
      {({
        errors,
        values,
        touched,
        handleChange,
        handleSubmit,
        setFieldTouched,
      }) => (
        <View>
          {/* Full Name */}
          <TextInputField
            icon={<PersonIcon />}
            placeholder="Full Name"
            value={values.full_name}
            onChangeText={handleChange('full_name')}
            error={touched.full_name && errors.full_name}
            onBlur={() => setFieldTouched('full_name')}
            touch={touched.full_name}
          />

          {/* Email */}
          <TextInputField
            icon={<EmialIcon />}
            placeholder="E-mail ID"
            value={values.email}
            onChangeText={handleChange('email')}
            error={touched.email && errors.email}
            onBlur={() => setFieldTouched('email')}
            touch={touched.email}
            inputMode="email"
          />

          {/* Password */}
          <TextInputField
            icon={<LockIcon />}
            placeholder="Password"
            password
            value={values.password}
            onChangeText={handleChange('password')}
            error={touched.password && errors.password}
            onBlur={() => setFieldTouched('password')}
            touch={touched.password}
          />

          {/* Confirm Password */}
          <TextInputField
            icon={<LockIcon />}
            placeholder="Confirm Password"
            password
            value={values.confirm_password}
            onChangeText={handleChange('confirm_password')}
            error={touched.confirm_password && errors.confirm_password}
            onBlur={() => setFieldTouched('confirm_password')}
            touch={touched.confirm_password}
          />

          {/* Phone Number */}
          <TextInputField
            icon={<PhoneIcon />}
            placeholder="Phone No."
            value={values.phone_number}
            onChangeText={handleChange('phone_number')}
            error={touched.phone_number && errors.phone_number}
            onBlur={() => setFieldTouched('phone_number')}
            touch={touched.phone_number}
          />

          {/* Submit Button */}
          <PrimaryButton
            label="Register"
            isLoading={isLoading}
            onPress={handleSubmit}
          />
        </View>
      )}
    </Formik>
  );
}
