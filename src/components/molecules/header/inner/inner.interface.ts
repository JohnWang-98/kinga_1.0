import { TouchableOpacityProps } from 'react-native';

export default interface IInner extends TouchableOpacityProps {
  label: string;
  gobackLabel: string;
  onBeforeBackHandler?: () => void;
}
