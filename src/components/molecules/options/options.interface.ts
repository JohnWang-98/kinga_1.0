export default interface IOptions {
  options: Options[];
  label?: string;
  recordTime?: string;
  selectedOption?: number;
  onChange?: (index: number) => void;
}
