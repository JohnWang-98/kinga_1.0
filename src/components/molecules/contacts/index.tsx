import { View, Image, TouchableOpacity, ScrollView } from 'react-native';
import IContacts from './contacts.interface';
import ContactsLogic from './contacts.logic';
import CustomText from '@/components/atoms/customText';
import { Fragment, useEffect } from 'react';
import RadioButton from '@/components/atoms/buttons/radio';
import SelectedContacts from '@/components/atoms/selectedContacts';

export default function Contacts(props: IContacts) {
  const {
    title,
    subtitle,
    contacts,
    toggleSelection,
    selectedOptions,
    multiSelect,
  } = props;
  const { displayedContacts, remainingContacts } = ContactsLogic({
    contacts,
    selectedOptions,
  });

  return (
    <View>
      <View className="mb-4">
        <CustomText className={'font-600 text-[17px] leading-6'}>
          {title}
        </CustomText>
        {multiSelect && selectedOptions.length >= 1 ? (
          <ScrollView horizontal className="flex-row">
            {displayedContacts.map((contact, index) => (
              <SelectedContacts
                key={index}
                name={contact.name}
                onRemove={() => toggleSelection(contacts.indexOf(contact))}
              />
            ))}
            {remainingContacts > 0 && (
              <View className="bg-white/50 flex-row items-center p-0.5 px-2 rounded-full">
                <CustomText className="text-xs text-background">
                  +{remainingContacts}
                </CustomText>
              </View>
            )}
          </ScrollView>
        ) : (
          <CustomText className="text-[11px] leading-[19.5px] text-muted-foreground">
            {subtitle}
          </CustomText>
        )}
      </View>
      {contacts.map((contact, index) => (
        <Fragment key={index}>
          <TouchableOpacity
            className="flex-row justify-between items-center"
            onPress={() => toggleSelection(index)}>
            <View className="flex-row items-center">
              <Image source={contact.profile} className="w-7 h-7" />
              <CustomText className="ml-3">{contact.name}</CustomText>
            </View>
            <RadioButton
              selected={selectedOptions.includes(index)}
              onPress={() => toggleSelection(index)}
            />
          </TouchableOpacity>
          <View className="flex-1 h-[1px] bg-white/20 my-2" />
        </Fragment>
      ))}
    </View>
  );
}
