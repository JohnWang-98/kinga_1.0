import { useState } from "react";
import * as Yup from "yup";

export default function ContactProfileLogic() {
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    display_name: "",
    display_phone_number: "",
  };

  const schema = Yup.object().shape({
    display_name: Yup.string().required("Required"),
    display_phone_number: Yup.string().required("Required"),
  });

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return {
    isLoading,
    handleSubmit,
    setIsLoading,
    schema,
    initialValues,
  };
}
