import { View } from "react-native";
import ICallerId from "./callerId.interface";
import CallerIdLogic from "./callerId.logic";
import { ScrollFrame } from "@/components/atoms/frame";
import InnerHeader from "@/components/molecules/header/inner";
import KingaCard from "@/components/molecules/card/kinga";
import CustomText from "@/components/atoms/customText";
import CreateContactProfile from "@/components/molecules/createContactProfile";
import Contacts from "@/components/molecules/contacts";
import { contacts } from "@/lib/constants";
import Separator from "@/components/atoms/separator";

export default function CallerId(props: ICallerId) {
  const {} = props;
  const { handleNavigate, selectedOptions, toggleSelection } = CallerIdLogic();

  return (
    <ScrollFrame>
      <InnerHeader label="Caller ID" gobackLabel="Settings" />
      <Separator />
      <KingaCard
        title="Choose from contacts"
        subtitle="Pick from your contacts"
        arrow
        onPress={handleNavigate}
      />
      <View className="my-4 text-center">
        <CustomText className="text-center">or</CustomText>
      </View>
      <CreateContactProfile />
      <Separator />
      <Contacts
        title="Profiles"
        subtitle="Select contacts from preexisting profiles."
        contacts={contacts}
        selectedOptions={selectedOptions}
        toggleSelection={toggleSelection}
      />
    </ScrollFrame>
  );
}
