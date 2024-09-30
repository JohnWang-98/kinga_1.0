import IRingSettings from "./ringSettings.interface";
import RingSettingsLogic from "./ringSettings.logic";
import { Frame } from "@/components/atoms/frame";
import Separator from "@/components/atoms/separator";
import InnerHeader from "@/components/molecules/header/inner";
import Options from "@/components/molecules/options";
import { ringSettingsOptions } from "@/lib/constants";

export default function RingSettings(props: IRingSettings) {
  const {} = props;
  const {} = RingSettingsLogic();

  return (
    <Frame>
      <InnerHeader label="Ring Settings" gobackLabel="Settings" />
      <Separator />
      <Options options={ringSettingsOptions} />
    </Frame>
  );
}
