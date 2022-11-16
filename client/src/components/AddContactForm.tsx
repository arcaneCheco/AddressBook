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
  submitHandler: (contactToAdd: Contact) => void;
  closeForm: () => void;
  additionalFields: Array<string>;
}

const noLeadingOrTrailingWhitespace = `^(?! )[A-Za-z ]*(?<! )$`;
const onlyNumbers = "^[0-9]+$";

export const AddContactForm = ({
  submitHandler,
  closeForm,
  additionalFields,
}: Props) => {
  const [contactToAdd, setContactToAdd] = useState<Contact>({
    id: "",
    firstName: "",
    lastName: "",
    mobile: "",
    additionalFields: {},
  });

  return (
    <ContactFormWrapper>
      <ContactForm
        onSubmit={(event) => {
          event.preventDefault();
          submitHandler(contactToAdd);
        }}
      >
        <CloseContactForm onClick={closeForm}>Close</CloseContactForm>
        <ContactFormInput
          type="text"
          pattern={noLeadingOrTrailingWhitespace}
          placeholder="First Name"
          required
          value={contactToAdd.firstName}
          onChange={(event) =>
            setContactToAdd({
              ...contactToAdd,
              firstName: event.target.value,
            })
          }
        />
        <ContactFormInput
          type="text"
          pattern={noLeadingOrTrailingWhitespace}
          placeholder="Last Name"
          required
          value={contactToAdd.lastName}
          onChange={(event) =>
            setContactToAdd({ ...contactToAdd, lastName: event.target.value })
          }
        />
        <ContactFormInput
          type="tel"
          placeholder="Phone"
          pattern={onlyNumbers}
          value={contactToAdd.mobile}
          onChange={(event) =>
            setContactToAdd({ ...contactToAdd, mobile: event.target.value })
          }
        />
        {additionalFields.map((field, index) => (
          <ContactFormInput
            key={field + index}
            type="text"
            pattern="\S.*\S"
            placeholder={field}
            value={contactToAdd.additionalFields[field] || ""}
            onChange={(event) => {
              const additionalFieldsObject = {
                ...contactToAdd.additionalFields,
              };
              additionalFieldsObject[field] = event.target.value;
              setContactToAdd({
                ...contactToAdd,
                additionalFields: additionalFieldsObject,
              });
            }}
          />
        ))}
        <SubmitButton>Create</SubmitButton>
      </ContactForm>
    </ContactFormWrapper>
  );
};

const SubmitButton = styled.button`
  height: 40px;
  width: 100%;
  margin-top: auto;
  cursor: pointer;
  border: none;
  background: #395b64;
  &:hover {
    background-color: #4a6c75;
  }
  color: white;
`;
