import { Formik } from "formik";
import SingUpLogic from "./singUp.logic";
import ISingUp from "./singUp.interface";
import { View, Text } from "react-native";
import LockIcon from "@/assets/icons/lock";
import EmialIcon from "@/assets/icons/email";
import PrimaryButton from "@/components/atoms/buttons/primary";
import TextInputField from "@/components/atoms/input/textInputField";
import PersonIcon from "@/assets/icons/person";
import PhoneIcon from "@/assets/icons/phone";

export default function SingUpForm(props: ISingUp) {
  const {} = props;
  const { SignUpSchema, handleSubmit, initialValues, isLoading } =
    SingUpLogic();

  return (
    <Formik
      validationSchema={SignUpSchema}
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
          <TextInputField
            icon={<PersonIcon />}
            placeholder="Full Name"
            value={values.full_name}
            onChangeText={handleChange("full_name")}
            error={touched.full_name && errors.full_name}
            onBlur={() => setFieldTouched("full_name")}
            touch={touched.full_name}
          />
          <TextInputField
            icon={<EmialIcon />}
            placeholder="E-mail ID"
            value={values.email}
            onChangeText={handleChange("email")}
            error={touched.email && errors.email}
            onBlur={() => setFieldTouched("email")}
            touch={touched.email}
            inputMode="email"
          />

          <TextInputField
            icon={<LockIcon />}
            placeholder="Password"
            password
            value={values.password}
            onChangeText={handleChange("password")}
            error={touched.password && errors.password}
            onBlur={() => setFieldTouched("password")}
            touch={touched.password}
          />
          <TextInputField
            icon={<LockIcon />}
            placeholder="Confirm Password"
            password
            value={values.confirm_password}
            onChangeText={handleChange(".confirm_password")}
            error={touched.confirm_password && errors.confirm_password}
            onBlur={() => setFieldTouched(".confirm_password")}
            touch={touched.confirm_password}
          />
          <TextInputField
            icon={<PhoneIcon />}
            placeholder="Phone No."
            value={values.email}
            onChangeText={handleChange("phone_number")}
            error={touched.phone_number && errors.phone_number}
            onBlur={() => setFieldTouched("phone_number")}
            touch={touched.phone_number}
          />
          <PrimaryButton
            label="Register"
            isLoading={isLoading}
            onPress={() => handleSubmit()}
          />
        </View>
      )}
    </Formik>
  );
}
