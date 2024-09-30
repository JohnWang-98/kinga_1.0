import React, { useEffect, useState } from 'react';
import IChooseFromContacts from './chooseFromContacts.interface';
import ChooseFromContactsLogic from './chooseFromContacts.logic';
import { ScrollFrame } from '@/components/atoms/frame';
import InnerHeader from '@/components/molecules/header/inner';
import ContactsComponent from '@/components/molecules/contacts'; // Renamed for clarity
import Separator from '@/components/atoms/separator';
import { View, StyleSheet, Text, Alert } from 'react-native';
import DefaultSafeAreaView from '../../../atoms/defaultSaveAreaView/DefaultSafeAreaView';

export default function ChooseFromContacts(props: IChooseFromContacts) {
  const {} = props;
  const { selectedOptions, toggleSelection, phoneContacts } =
    ChooseFromContactsLogic();

  return (
    <DefaultSafeAreaView>
      <ScrollFrame>
        <InnerHeader label="Contacts" gobackLabel="Settings" />
        <Separator />
        <ContactsComponent
          title="Select contacts from your device."
          contacts={phoneContacts} // Pass fetched contacts
          selectedOptions={selectedOptions}
          toggleSelection={toggleSelection}
          multiSelect={false} // Assuming you want multi-select based on the code
        />
      </ScrollFrame>
    </DefaultSafeAreaView>
  );
}
