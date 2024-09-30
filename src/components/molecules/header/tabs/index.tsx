import { View } from 'react-native';
import ITabs from './tabs.interface';
import TabsLogic from './tabs.logic';
import { Avatar, Switch } from 'react-native-paper';
import { Fragment } from 'react';
import CustomText from '@/components/atoms/customText';
import { Colors } from '@/lib/colors';
import { cn } from '@/lib/utils';

export default function TabsHeader(props: ITabs) {
  const { label, avatar, avatarImage, className, ...rest } = props;
  const { statusBarHeight, isSwitchOn, toggleSwitch } = TabsLogic();

  return (
    <View
      style={{ paddingTop: (statusBarHeight || 0) + 20 }}
      className=" bg-background">
      <View
        className={cn(
          `flex flex-row justify-center items-center relative h-12 bg-background ${
            avatar ? 'justify-between' : 'justify-center'
          }`,
          className,
        )}
        {...rest}>
        {label ? (
          <Fragment>
            {avatar && <View className="w-12" />}
            <CustomText className="font-600 text-xl">{label}</CustomText>
          </Fragment>
        ) : (
          <Switch
            color={Colors.primary}
            onValueChange={toggleSwitch}
            value={isSwitchOn}
          />
        )}
        {avatarImage && <Avatar.Image size={48} source={avatarImage} />}
      </View>
    </View>
  );
}
