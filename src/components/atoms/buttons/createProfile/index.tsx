import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import ICreateProfile from "./createProfile.interface";

export default function CreateProfileButton(props: ICreateProfile) {
  const { label, isLoading, ...rest } = props;

  return (
    <TouchableOpacity
      {...rest}
      className={`mt-1 h-[28px] w-[120px] bg-primary relative rounded-full items-center justify-center`}
    >
      {isLoading ? (
        <ActivityIndicator size={24} color="white" />
      ) : (
        <Text className={`text-xs text-white font-400`}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}
