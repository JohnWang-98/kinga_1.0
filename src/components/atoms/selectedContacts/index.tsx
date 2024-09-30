import {View, TouchableOpacity} from 'react-native';
import ISelectedContact from './selectedContact.interface';
import CustomText from '../customText';
import X from '@/assets/icons/x';

export default function SelectedContacts(props: ISelectedContact) {
  const {name, onRemove} = props;

  return (
    <View className="bg-white/50 flex-row items-center p-0.5 px-2 rounded-full mr-2">
      <CustomText className="text-xs text-background mr-1">{name}</CustomText>
      <TouchableOpacity onPress={onRemove}>
        <X />
      </TouchableOpacity>
    </View>
  );
}
