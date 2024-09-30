export default interface IToggle {
  options: Options[];
  label?: string;
  selectedOption: number | undefined;
  setSelectedOption: (id: number) => void;
}
