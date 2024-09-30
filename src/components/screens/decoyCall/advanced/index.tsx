import { View, Text } from "react-native";
import IAdvanced from "./advanced.interface";
import AdvancedLogic from "./advanced.logic";
import { Frame } from "@/components/atoms/frame";
import InnerHeader from "@/components/molecules/header/inner";
import CustomText from "@/components/atoms/customText";
import Separator from "@/components/atoms/separator";

export default function Advanced(props: IAdvanced) {
  const {} = props;
  const {} = AdvancedLogic();
  return (
    <Frame>
      <InnerHeader label="Advanced" gobackLabel="Settings" />
      <Separator />
    </Frame>
  );
}
