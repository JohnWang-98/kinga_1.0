import useSelectedOptionsStore from "@/lib/store/contactIndex";

interface Props {
  contacts: Contacts[];
  selectedOptions: number[];
}

export default function ContactsLogic({ selectedOptions, contacts }: Props) {
  const selectedContacts = contacts.filter((_, index) =>
    selectedOptions.includes(index)
  );

  const displayedContacts = selectedContacts.slice(0, 4);
  const remainingContacts = selectedContacts.length - 4;
  return { displayedContacts, remainingContacts };
}
