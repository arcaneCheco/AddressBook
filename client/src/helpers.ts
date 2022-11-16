import { Contact, Data } from "./App";

export const fetchData = async (): Promise<Data | undefined> => {
  try {
    const response = await fetch("http://localhost:3001/getContacts");

    if (!response.ok) {
      console.log({
        Warning: "Faulty server response",
        serverResponse: response.statusText,
      });
    }

    const data: Promise<Data> = await response.json();

    return data;
  } catch (error) {
    console.log({ Warning: "Error fetching data", serverResponse: error });
  }
};

export const postNewContact = async (data: Contact) => {
  const response = await fetch("http://localhost:3001/addContact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  await response.json();
};

export const deleteContact = async (id: string) => {
  const response = await fetch("http://localhost:3001/deleteContact", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  await response.json();
};

export const editContact = async (contact: Contact) => {
  const response = await fetch("http://localhost:3001/editContact", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contact }),
  });

  await response.json();
};

export const postNewField = async (field: string) => {
  const response = await fetch("http://localhost:3001/addField", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ field }),
  });

  await response.json();
};

export const deleteField = async (field: string) => {
  const response = await fetch("http://localhost:3001/deleteField", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ field }),
  });

  await response.json();
};

export const parseName = (contact: Contact) => {
  return `${contact.firstName} ${contact.lastName}`;
};

export const filterContactsBySearchTerm = ({
  contacts,
  searchFilter,
}: {
  contacts: Array<Contact>;
  searchFilter: string;
}): Array<Contact> => {
  if (searchFilter.trim() === "") return contacts;

  return contacts.filter((contact) => {
    const regex = new RegExp(`^${searchFilter.trim()}`, "gi");
    return (
      regex.test(contact.firstName) ||
      regex.test(contact.lastName) ||
      regex.test(parseName(contact))
    );
  });
};
