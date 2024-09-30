import { View } from "react-native";
import IContactProfile from "./contactProfile.interface";
import ContactProfileLogic from "./contactProfile.logic";
import { Formik } from "formik";
import ContactProfileInputField from "@/components/atoms/input/contactProfile";
import CreateProfileButton from "@/components/atoms/buttons/createProfile";

export default function ContactProfileForm(props: IContactProfile) {
  const {} = props;
  const { isLoading, schema, handleSubmit, initialValues } =
    ContactProfileLogic();

  return (
    <View>
      <Formik
        validationSchema={schema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({
          errors,
          values,
          touched,
          handleChange,
          handleSubmit,
          setFieldTouched,
        }) => (
          <View>
            <ContactProfileInputField
              placeholder="Display Name"
              value={values.display_name}
              onChangeText={handleChange("display_name")}
              error={touched.display_name && errors.display_name}
              onBlur={() => setFieldTouched("display_name")}
              touch={touched.display_name}
            />
            <ContactProfileInputField
              placeholder="Display Phone Number"
              value={values.display_phone_number}
              onChangeText={handleChange("display_phone_number")}
              error={
                touched.display_phone_number && errors.display_phone_number
              }
              onBlur={() => setFieldTouched("display_phone_number")}
              touch={touched.display_phone_number}
            />

            <CreateProfileButton
              label="Save Avatar"
              isLoading={isLoading}
              onPress={() => handleSubmit()}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}
