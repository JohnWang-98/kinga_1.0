import {View, Text, TextInput} from 'react-native';
import ITextInputField from './textInputField.interface';
import TextInputFieldLogic from './textInputField.logic';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {cn} from '@/lib/utils';

export default function TextInputField(props: ITextInputField) {
  const {icon, error, touch, password, viewClassName, ...rest} = props;
  const {hidePassword, isFocused, setIsFocused, setHidePassword} =
    TextInputFieldLogic(password);

  return (
    <View className="mb-4">
      <View
        className={cn(
          `rounded-full border-2 flex-row items-center px-5 mb-1 h-14 ${
            isFocused ? 'border-primary' : 'border-[#E2E8F0] drop-shadow-2xl'
          } ${error && touch ? 'border-red-400' : ''}`,
          viewClassName,
        )}>
        {icon}
        <TextInput
          className="ml-4 font-500 flex-1 py-0 items-center placeholder:font-500 placeholder:text-sm placeholder:text-muted -mb-0.5"
          autoCorrect={false}
          placeholderTextColor="#ACACAC"
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          secureTextEntry={hidePassword}
          {...rest}
        />
        {password && (
          <MaterialCommunityIcons
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            color={'#D2D2D2'}
            size={24}
          />
        )}
      </View>
      {error && touch && (
        <Text className="font-500 text-sm pl-7 text-red-400">{error}</Text>
      )}
    </View>
  );
}
