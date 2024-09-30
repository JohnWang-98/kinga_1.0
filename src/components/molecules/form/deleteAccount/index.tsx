import { View } from 'react-native';
import { Formik } from 'formik';
import CreateProfileButton from '@/components/atoms/buttons/createProfile';
import CustomizeTextInputField from '@/components/atoms/input/customizeText';
import DeleteAccountLogic from './deleteAccount.logic';
import IDeleteAccount from './deleteAccount.interface';
import PrimaryButton from '@/components/atoms/buttons/primary';

export default function DeleteAccoutForm(props: IDeleteAccount) {
  const { onDeleteAccount } = props;
  const { isLoading, schema, handleSubmit, initialValues } = DeleteAccountLogic(
    { onDeleteAccount },
  );

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
          <CustomizeTextInputField
            placeholder="Write something/suggest something to improve our app."
            value={values.display_name}
            onChangeText={handleChange('display_name')}
            error={touched.display_name && errors.display_name}
            onBlur={() => setFieldTouched('display_name')}
            touch={touched.display_name}
          />
          <PrimaryButton
            label="Delete my Account Now "
            textClassName="text-red-500"
            className="bg-red-500/30 mt-1"
            onPress={() => handleSubmit()}
          />
        </View>
      )}
    </Formik>
  );
}
