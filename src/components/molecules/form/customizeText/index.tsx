import { View } from 'react-native';
import ICustomizeText from './customizeText.interface';
import CustomizeTextLogic from './customizeText.logic';
import { Formik } from 'formik';
import CreateProfileButton from '@/components/atoms/buttons/createProfile';
import CustomizeTextInputField from '@/components/atoms/input/customizeText';

export default function CustomizeTextForm(props: ICustomizeText) {
  const {} = props;
  const { isLoading, schema, handleSubmit, initialValues } =
    CustomizeTextLogic();

  return (
    <View>
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
              placeholder="Type here"
              value={values.display_name}
              onChangeText={handleChange('display_name')}
              error={touched.display_name && errors.display_name}
              onBlur={() => setFieldTouched('display_name')}
              touch={touched.display_name}
            />
            <CreateProfileButton
              label="Save message"
              isLoading={isLoading}
              onPress={() => handleSubmit()}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}
