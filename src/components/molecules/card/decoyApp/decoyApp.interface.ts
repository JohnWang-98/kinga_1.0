import { Dispatch, SetStateAction } from "react";

export default interface IDecoyApp {
  data: DecoyAppCard;
  setSelectedOption: Dispatch<SetStateAction<number | null>>;
  selectedOption: number | null;
}
