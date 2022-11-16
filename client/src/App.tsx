import { Fragment, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { AddContactForm } from "./components/AddContactForm";
import { AddressBook } from "./components/AddressBook";
import { NewContactButton } from "./components/NewContactButton";
import { SearchBar } from "./components/SearchBar";
import {
  deleteContact,
  deleteField,
  editContact,
  fetchData,
  filterContactsBySearchTerm,
  postNewContact,
  postNewField,
} from "./helpers";
import { EditContactForm } from "./components/EditContactForm";

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  mobile: string;
  additionalFields: { [name: string]: string };
}

export interface Data {
  contacts: Array<Contact>;
  additionalFields: Array<string>;
}

export const App = () => {
  const [data, setData] = useState<Data>();

  const [filteredContacts, setFilteredContacts] = useState<Array<Contact>>([]);

  const [isAddingContact, setIsAddingContact] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);

  const fetchAndSetData = async () => {
    const data = await fetchData();
    data && setData(data);
  };

  const createNewContact = async (contact: Contact) => {
    await postNewContact(contact);
    setIsAddingContact(false);
    await fetchAndSetData();
  };

  const [contactToEdit, setContactToEdit] = useState<Contact | null>(null);

  const onClickContactCard = (id: string) => {
    const contact = data?.contacts.find((contact) => contact.id === id)!;
    contact && setContactToEdit(contact);
    setIsEditingContact(true);
  };

  useEffect(() => {
    (async () => {
      await fetchAndSetData();
    })();
  }, []);

  const deleteContactHandler = async (id: string) => {
    await deleteContact(id);

    setIsEditingContact(false);

    await fetchAndSetData();
  };

  const editContactHandler = async (contact: Contact) => {
    await editContact(contact);

    setIsEditingContact(false);

    await fetchAndSetData();
  };

  const addNewField = async (field: string) => {
    if (data?.additionalFields.includes(field) || field.trim() === "") return;
    await postNewField(field);
    await fetchAndSetData();
  };

  const deleteFieldHandler = async (field: string) => {
    await deleteField(field);
    await fetchAndSetData();
  };

  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    setFilteredContacts(
      filterContactsBySearchTerm({
        contacts: data?.contacts || [],
        searchFilter,
      })
    );
  }, [searchFilter, data?.contacts]);

  return (
    <Fragment>
      <AppContainer isEditingAddressBook={isAddingContact || isEditingContact}>
        <SearchBar
          onChange={(value: string) => {
            setSearchFilter(value);
          }}
          searchFilter={searchFilter}
        />
        <AddressBook
          contacts={filteredContacts}
          onClickContactCard={onClickContactCard}
          additionalFields={data?.additionalFields || []}
          addField={addNewField}
          deleteField={deleteFieldHandler}
        />
        <NewContactButton clickHandler={() => setIsAddingContact(true)} />
      </AppContainer>
      {isAddingContact && (
        <AddContactForm
          submitHandler={createNewContact}
          closeForm={() => setIsAddingContact(false)}
          additionalFields={data?.additionalFields || []}
        />
      )}
      {isEditingContact && (
        <EditContactForm
          closeForm={() => setIsEditingContact(false)}
          contactToEdit={contactToEdit}
          deleteContact={deleteContactHandler}
          editContact={editContactHandler}
          additionalFields={data?.additionalFields || []}
        />
      )}
    </Fragment>
  );
};

const AppContainer = styled.div<{ isEditingAddressBook: boolean }>`
  width: 100%;
  max-width: 1200px;
  height: 100%;
  padding: 3% 6%;
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-rows: 10% 80% 10%;
  position: relative;
  ${({ isEditingAddressBook }) =>
    isEditingAddressBook &&
    css`
      filter: blur(4px);
      -webkit-filter: blur(4px);
    `}
`;
