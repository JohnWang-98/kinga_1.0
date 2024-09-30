import ILabel from "./label.interface";
import LabelLogic from "./label.logic";
import CustomText from "../customText";

export default function Label(props: ILabel) {
  const {} = props;
  const {} = LabelLogic();
  return (
    <CustomText className="-mb-0.5 text-muted-foreground text-[13.5px]">
      Label
    </CustomText>
  );
}
