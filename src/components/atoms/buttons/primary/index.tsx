import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import IPrimary from "./primary.interface";
import { cn } from "@/lib/utils";

export default function PrimaryButton(props: IPrimary) {
  const { label, className, isLoading, textClassName, ...rest } = props;

  return (
    <TouchableOpacity
      {...rest}
      className={cn(
        `mt-1 h-14 bg-primary relative rounded-full items-center justify-center`,
        className
      )}
    >
      {isLoading ? (
        <ActivityIndicator size={24} color="white" />
      ) : (
        <Text className={cn(`text-base text-white font-500`, textClassName)}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}
