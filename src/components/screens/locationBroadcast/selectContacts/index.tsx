import React, { useEffect, useState, Fragment } from 'react';
import ISelectContacts from './selectContacts.interface';
import SelectContactsLogic from './selectContacts.logic';
import { ScrollFrame } from '@/components/atoms/frame';
import InnerHeader from '@/components/molecules/header/inner';
import Contacts from '@/components/molecules/contacts';
import Separator from '@/components/atoms/separator';
import PrimaryButton from '@/components/atoms/buttons/primary';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import DefaultSafeAreaView from '@/components/atoms/defaultSaveAreaView/DefaultSafeAreaView';

export default function SelectContacts(props: ISelectContacts) {
  const {} = props;
  const {
    isLoading,
    setIsLoading,
    phoneContacts,
    setPhoneContacts,
    selectedOptions,
    toggleSelection,
    handleSaveContacts,
  } = SelectContactsLogic();

  return (
    <DefaultSafeAreaView>
      <ScrollFrame className="relative">
        <InnerHeader label="Select Contacts" gobackLabel="Back" />
        <Separator />
        {isLoading ? (
          <ActivityIndicator size={24} color="white" />
        ) : (
          <Contacts
            title="Contacts"
            subtitle="Select contacts to receive your live location via text."
            contacts={phoneContacts} // Use fetched contacts
            selectedOptions={selectedOptions}
            toggleSelection={toggleSelection}
            multiSelect
          />
        )}
        <Separator />
        <Separator />
      </ScrollFrame>
      <PrimaryButton
        className="absolute bottom-12 left-16 right-16 h-12"
        textClassName="text-xs"
        isLoading={isLoading}
        onPress={handleSaveContacts}
        label={`Save Contacts (${selectedOptions.length})`}
      />
    </DefaultSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#152e42',
  },
  fullScreen: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1, // Ensure it renders above the tab bar
  },
});
