import { View, TouchableOpacity } from 'react-native';
import IOptions from './options.interface';
import OptionsLogic from './options.logic';
import CustomText from '@/components/atoms/customText';
import { Fragment, useEffect } from 'react';
import { Switch } from 'react-native-paper';
import { Colors } from '@/lib/colors';
import RadioButton from '@/components/atoms/buttons/radio';
import Alert from '../alert';

export default function Options(props: IOptions) {
  const { options, label, recordTime } = props;
  const {
    handleLayout,
    viewWidth,
    handlePress,
    toggleStates,
    onToggleSwitch,
    onConfirmLogout,
    alertVisible,
    setAlertVisible,
    selectedOption,
    setSelectedOption,
  } = OptionsLogic({ options });

  useEffect(() => {
    if (props.selectedOption !== undefined)
      setSelectedOption(props.selectedOption);
  }, [props]);

  return (
    <View className="bg-black/30 rounded-xl py-1">
      {label && (
        <CustomText className="pl-4 py-[10px] text-[13px]">{label}</CustomText>
      )}
      {options.map((option, index) => (
        <Fragment key={index}>
          <TouchableOpacity
            className="border-b border-transparent"
            onPress={() => {
              handlePress({ option, index });
              props.onChange && props.onChange(index);
            }}>
            <View className="flex flex-row items-center justify-between px-3 py-[10px]">
              <View className="flex flex-row items-center">
                <View onLayout={handleLayout}>
                  {option.buttonType === 'player' && (
                    <RadioButton
                      selected={selectedOption === index}
                      onPress={() => {
                        setSelectedOption(index);
                        props.onChange && props.onChange(index);
                      }}
                      className="pr-3"
                    />
                  )}

                  {option.buttonType === 'navigation' && (
                    <Fragment>
                      {/* No need to render RadioButton here if icon is passed via leftChildren */}
                    </Fragment>
                  )}

                  {option.buttonType === 'option' ? (
                    <RadioButton
                      selected={selectedOption === index}
                      onPress={() => {
                        setSelectedOption(index);
                      }}
                      className="pr-3"
                    />
                  ) : (
                    <Fragment>
                      {option.leftChildren && (
                        <View className="pr-3">
                          <option.leftChildren />
                        </View>
                      )}
                    </Fragment>
                  )}
                </View>
                <CustomText
                  className={`-mb-0.5 text-[13px] ${
                    option.buttonType === 'logout' ? 'text-red-500' : ''
                  }`}>
                  {option.label}
                </CustomText>
              </View>

              {/* Display recordTime on the right */}
              {recordTime && (
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <CustomText>{recordTime}</CustomText>
                </View>
              )}

              {option.buttonType === 'logout' && (
                <Alert
                  visible={alertVisible}
                  title="Logout"
                  message="Are you sure you want to logout?"
                  onCancel={() => setAlertVisible(false)}
                  onConfirm={onConfirmLogout}
                  cancelText="No"
                  confirmText="Yes"
                />
              )}
              {option.buttonType === 'switch' ? (
                <Switch
                  color={Colors.primary}
                  value={toggleStates[index]}
                  onValueChange={() => {
                    onToggleSwitch(index);
                    option.onToggleSwitch &&
                      option.onToggleSwitch(option.id, !toggleStates[index]);
                  }}
                />
              ) : option.buttonType === 'toggler' ? (
                <RadioButton
                  selected={selectedOption === index}
                  onPress={() => setSelectedOption(index)}
                />
              ) : (
                <Fragment>
                  {option.rightChildren && <option.rightChildren />}
                </Fragment>
              )}
            </View>
          </TouchableOpacity>
          {index < options.length - 1 && (
            <View className="flex flex-row">
              <View style={{ marginLeft: viewWidth + 13 }} />
              <View className="flex-1 h-[1px] bg-white/20" />
            </View>
          )}
        </Fragment>
      ))}
    </View>
  );
}
