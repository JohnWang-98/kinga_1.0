import { Formik } from 'formik';
import SignInLogic from './signIn.logic';
import LockIcon from '@/assets/icons/lock';
import EmailIcon from '@/assets/icons/email';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import PrimaryButton from '@/components/atoms/buttons/primary';
import CheckboxInputField from '@/components/atoms/input/checkbox';
import TextInputField from '@/components/atoms/input/textInputField';
import IconButton from '@/components/atoms/buttons/icon';
import GoogleIcon from '@/assets/icons/google';
import AppleIcon from '@/assets/icons/apple';

export default function SignInForm() {
  const { isLoading, SignInSchema, handleSubmit, initialValues } =
    SignInLogic();

  return (
    <View>
      <Formik
        validationSchema={SignInSchema}
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={handleSubmit}>
        {({
          errors, // Validation errors
          values, // Form values
          touched, // Field touch status
          handleChange, // Change handler
          handleSubmit, // Submit handler
          setFieldValue,
          setFieldTouched, // Field touch handler
        }) => (
          <View>
            {/* Email Input */}
            <TextInputField
              icon={<EmailIcon />}
              placeholder="E-mail ID"
              value={values.email}
              onChangeText={handleChange('email')}
              error={touched.email && errors.email} // Field error handling
              onBlur={() => setFieldTouched('email')}
              touch={touched.email}
              inputMode="email"
            />
            {/* Error Message for Email */}
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            {/* Password Input */}
            <TextInputField
              icon={<LockIcon />}
              placeholder="Password"
              password
              value={values.password}
              onChangeText={handleChange('password')}
              error={touched.password && errors.password} // Field error handling
              onBlur={() => setFieldTouched('password')}
              touch={touched.password}
            />
            {/* Error Message for Password */}
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            {/* Remember me & Forgot Password */}
            <View style={styles.row}>
              <CheckboxInputField
                label="Remember me"
                value={values.rememberMe}
                onPress={() => setFieldValue('rememberMe', !values.rememberMe)}
              />
              <TouchableOpacity>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Submit Button */}
            <PrimaryButton
              label="Login"
              isLoading={isLoading}
              onPress={() => handleSubmit()}
            />
          </View>
        )}
      </Formik>

      {/* OR Divider */}
      <View style={styles.orDivider}>
        <View style={styles.dividerLine} />
        <Text style={styles.orText}>Or login with</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Social Login Buttons */}
      <View style={styles.socialButtons}>
        <IconButton icon={<GoogleIcon />} label="Google" />
        <IconButton icon={<AppleIcon />} label="Apple" />
      </View>
    </View>
  );
}

// StyleSheet for error messages and other elements
const styles = StyleSheet.create({
  errorText: {
    color: 'red', // Error text color
    fontSize: 12, // Error text size
    marginTop: 4, // Margin between the input and error text
    marginLeft: 4, // Small left margin
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  forgotText: {
    color: '#007AFF', // Blue text for "Forgot Password?"
    fontSize: 12,
  },
  orDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    height: 1,
    backgroundColor: '#CBD5E1',
    width: '21%',
  },
  orText: {
    color: '#6B7280',
    marginHorizontal: 8,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
