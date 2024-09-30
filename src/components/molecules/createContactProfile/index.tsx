import { View, Text } from "react-native";
import ICreateContactProfile from "./createContactProfile.interface";
import CreateContactProfileLogic from "./createContactProfile.logic";
import CustomText from "@/components/atoms/customText";
import ProfleIcon from "@/assets/icons/profile";
import ContactProfileForm from "../form/contactProfile";

export default function CreateContactProfile(props: ICreateContactProfile) {
  const {} = props;
  const {} = CreateContactProfileLogic();
  return (
    <View className="bg-black/30 rounded-xl p-3">
      <View>
        <CustomText className={"font-600 text-[17px] leading-6"}>
          Create Contact Profile
        </CustomText>
        <CustomText className="text-[10px] leading-4 text-muted-foreground">
          Create your own decoy contact
        </CustomText>
      </View>
      <View className="my-2" />
      <ProfleIcon />
      <View className="my-2" />
      <ContactProfileForm />
    </View>
  );
}
