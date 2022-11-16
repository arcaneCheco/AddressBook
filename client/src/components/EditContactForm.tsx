import { useState } from "react";
import styled from "styled-components";
import { Contact } from "../App";
import {
  CloseContactForm,
  ContactForm,
  ContactFormInput,
  ContactFormWrapper,
} from "./sharedStyles";

interface Props {
  closeForm: () => void;
  contactToEdit: Contact | null;
  deleteContact: (id: string) => void;
  editContact: (contact: Contact) => void;
  additionalFields: Array<string>;
}

enum ButtonSubmitType {
  Edit = "Edit",
  Delete = "Delete",
}

const noLeadingOrTrailingWhitespace = `^(?! )[A-Za-z ]*(?<! )$`;
const onlyNumbers = "^[0-9]+$";

export const EditContactForm = ({
  closeForm,
  deleteContact,
  contactToEdit,
  editContact,
  additionalFields,
}: Props) => {
  const [buttonSubmitType, setButtonSubmitType] = useState(
    ButtonSubmitType.Edit
  );
  const [editedContact, setEditedContact] = useState(
    contactToEdit ||
      ({
        firstName: "",
        lastName: "",
        mobile: "",
        additionalFields: {},
      } as Contact)
  );

  return (
    <ContactFormWrapper>
      <ContactForm
        onSubmit={(event) => {
          event.preventDefault();
          if (buttonSubmitType === ButtonSubmitType.Edit) {
            editContact(editedContact);
          } else {
            deleteContact(contactToEdit!.id);
          }
        }}
      >
        <CloseContactForm onClick={closeForm}>Close</CloseContactForm>
        <ContactFormInput
          type="text"
          pattern={
            buttonSubmitType === ButtonSubmitType.Edit
              ? noLeadingOrTrailingWhitespace
              : undefined
          }
          placeholder="First Name"
          required={buttonSubmitType === ButtonSubmitType.Edit}
          value={editedContact.firstName}
          onChange={(event) =>
            setEditedContact({
              ...editedContact,
              firstName: event.target.value,
            })
          }
        />
        <ContactFormInput
          type="text"
          placeholder="Last Name"
          pattern={
            buttonSubmitType === ButtonSubmitType.Edit
              ? noLeadingOrTrailingWhitespace
              : undefined
          }
          required={buttonSubmitType === ButtonSubmitType.Edit}
          value={editedContact.lastName}
          onChange={(event) =>
            setEditedContact({
              ...editedContact,
              lastName: event.target.value,
            })
          }
        />
        <ContactFormInput
          type="tel"
          placeholder="Phone"
          pattern={onlyNumbers}
          value={editedContact.mobile}
          onChange={(event) =>
            setEditedContact({
              ...editedContact,
              mobile: event.target.value,
            })
          }
        />
        {additionalFields.map((field, index) => (
          <ContactFormInput
            key={field + index}
            type="text"
            placeholder={field}
            value={editedContact.additionalFields[field]}
            onChange={(event) => {
              const additionalFieldsObject = {
                ...editedContact.additionalFields,
              };
              additionalFieldsObject[field] = event.target.value;
              setEditedContact({
                ...editedContact,
                additionalFields: additionalFieldsObject,
              });
            }}
          />
        ))}
        <SubmitButtons>
          <DeleteButton
            onClick={() => setButtonSubmitType(ButtonSubmitType.Delete)}
          >
            Delete Contact
          </DeleteButton>
          <EditButton
            onClick={() => setButtonSubmitType(ButtonSubmitType.Edit)}
          >
            Save Changes
          </EditButton>
        </SubmitButtons>
      </ContactForm>
    </ContactFormWrapper>
  );
};

const SubmitButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: auto;
`;

const SubmitButton = styled.button`
  height: 40px;
  width: 100%;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 2px;
`;

const DeleteButton = styled(SubmitButton)`
  background-color: #c74b50;
  &:hover {
    background-color: #d85c61;
  }
`;

const EditButton = styled(SubmitButton)`
  background-color: #395b64;
  &:hover {
    background-color: #4a6c75;
  }
`;
