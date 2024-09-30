import { View, Text } from 'react-native';
import ChangePasswordLogic from './changePassword.logic';
import { Formik } from 'formik';
import TextInputField from '@/components/atoms/input/textInputField';
import LockIcon from '@/assets/icons/lock';
import PrimaryButton from '@/components/atoms/buttons/primary';

export default function ChangePasswordForm() {
  const { isLoading, handleSubmit, initialValues, schema } =
    ChangePasswordLogic();
  return (
    <Formik
      validationSchema={schema}
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
          <TextInputField
            icon={<LockIcon />}
            placeholder="Current password"
            password
            value={values.current_password}
            onChangeText={handleChange('current_password')}
            error={touched.current_password && errors.current_password}
            onBlur={() => setFieldTouched('current_password')}
            touch={touched.current_password}
          />
          <TextInputField
            icon={<LockIcon />}
            placeholder="New password"
            password
            value={values.new_password}
            onChangeText={handleChange('new_password')}
            error={touched.new_password && errors.new_password}
            onBlur={() => setFieldTouched('new_password')}
            touch={touched.new_password}
          />
          <TextInputField
            icon={<LockIcon />}
            placeholder="Re-enter new password"
            password
            value={values.confirm_password}
            onChangeText={handleChange('confirm_password')}
            error={touched.confirm_password && errors.confirm_password}
            onBlur={() => setFieldTouched('confirm_password')}
            touch={touched.confirm_password}
          />
          <PrimaryButton
            label="Save"
            isLoading={isLoading}
            onPress={() => handleSubmit()}
          />
        </View>
      )}
    </Formik>
  );
}
