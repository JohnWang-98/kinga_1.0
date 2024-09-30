import useToggleSwitchStore from "@/lib/store/toggleSwitch";

export default function DefaultWidgetLogic() {
  const { isSwitchOn } = useToggleSwitchStore();

  return {
    isSwitchOn,
  };
}
