import IDisplaySettings from "./displaySettings.interface";
import DisplaySettingsLogic from "./displaySettings.logic";
import { Frame } from "@/components/atoms/frame";
import Separator from "@/components/atoms/separator";
import InnerHeader from "@/components/molecules/header/inner";
import Options from "@/components/molecules/options";
import { displaySettingsOptions } from "@/lib/constants";

export default function DisplaySettings(props: IDisplaySettings) {
  const {} = props;
  const {} = DisplaySettingsLogic();
  return (
    <Frame>
      <InnerHeader label="Display Settings" gobackLabel="Settings" />
      <Separator />
      <Options options={displaySettingsOptions} />
    </Frame>
  );
}
