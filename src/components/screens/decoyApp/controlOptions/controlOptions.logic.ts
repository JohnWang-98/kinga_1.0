import { useState, useEffect } from 'react';
import {
  saveLocalData,
  getLocalData,
  clearLocalData,
} from '@/lib/helpers/localStorage';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ControlOptionsLogic() {
  const [selectedOption, setSelectedOption] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);
  const [option, setOption] = useState<any>(null);

  const route = useRoute(); // Access the passed route params
  const navigation = useNavigation();

  const { id } = route.params; // Get the ID from route params (e.g., 'playButton', 'skipButton')

  useEffect(() => {
    // Load stored option from local storage when component mounts
    const loadOption = async () => {
      const savedOption = await getLocalData(id); // Load saved data for the specific control option (e.g., 'playButton')
      if (savedOption !== null) {
        setSelectedOption(savedOption);
      }
    };
    loadOption();
  }, [id]);

  const handleSave = async () => {
    setLoading(true);
    // Save the selected option to local storage using the ID of the control option
    console.log(selectedOption);
    if (selectedOption === null || selectedOption === undefined) {
      await clearLocalData(id);
    } else {
      await saveLocalData(id, selectedOption);
    }

    setLoading(false);
    navigation.goBack(); // Navigate back to the previous screen
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return {
    option,
    selectedOption,
    setSelectedOption,
    handleSave,
    loading,
    handleBack,
  };
}
