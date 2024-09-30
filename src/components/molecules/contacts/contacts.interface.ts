export default interface IContacts {
  multiSelect?: boolean;
  title: string;
  subtitle: string;
  contacts: Contacts[];
  selectedOptions: number[];
  toggleSelection: (id: number) => void;
}
