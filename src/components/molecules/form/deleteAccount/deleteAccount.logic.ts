import { useState } from 'react';
import * as Yup from 'yup';

export default function DeleteAccountLogic({ onDeleteAccount }) {
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    display_name: '',
  };

  const schema = Yup.object().shape({
    display_name: Yup.string(),
  });

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    await onDeleteAccount(values.display_name);
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
