import { View, TouchableOpacity } from "react-native";
import IKinga from "./kinga.interface";
import KingaLogic from "./kinga.logic";
import CustomText from "@/components/atoms/customText";
import CheveronRight from "@/assets/icons/cheveron-right";
import { cn } from "@/lib/utils";

export default function KingaCard(props: IKinga) {
  const { subtitle, title, arrow, children, titleClassName, ...rest } = props;
  const {} = KingaLogic();
  return (
    <TouchableOpacity {...rest}>
      <View className="flex flex-row  bg-black/30 rounded-xl p-3 items-center justify-between">
        <View className="flex-row items-center">
          {children && <View className="mr-3">{children}</View>}
          <View className="">
            <CustomText
              className={cn("font-600 text-[17px] leading-6", titleClassName)}
            >
              {title}
            </CustomText>
            <CustomText className="text-[10px] leading-4 text-muted-foreground">
              {subtitle}
            </CustomText>
          </View>
        </View>
        {arrow && <CheveronRight />}
      </View>
    </TouchableOpacity>
  );
}
