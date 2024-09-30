import { Pressable, Text } from 'react-native';
import ICheckbox from './checkbox.interface';
import CheckboxLogic from './checkbox.logic';
import { Checkbox } from 'react-native-paper';
import { Colors } from '@/lib/colors';
import { useEffect } from 'react';

export default function CheckboxInputField(props: ICheckbox) {
  const { label, onPress, value } = props;
  const { checked, setChecked } = CheckboxLogic();

  useEffect(() => {
    setChecked(value);
  }, [value]);

  return (
    <Pressable
      onPress={() => {
        setChecked(!checked);
        onPress && onPress();
      }}
      className="flex-row items-center -mt-1.5">
      <Checkbox
        color={Colors.primary}
        status={checked ? 'checked' : 'unchecked'}
      />
      <Text className="text-muted font-600 text-xs">{label}</Text>
    </Pressable>
  );
}
