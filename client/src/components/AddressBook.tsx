import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ContactCard } from "./ContactCard";
import { ContactHeaders } from "./ContactHeaders";
import { Contact } from "../App";

interface Props {
  contacts: Array<Contact>;
  onClickContactCard: (id: string) => void;
  additionalFields: Array<string>;
  addField: (field: string) => void;
  deleteField: (field: string) => void;
}

export const AddressBook = ({
  contacts,
  onClickContactCard,
  additionalFields,
  addField,
  deleteField,
}: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [wrapperWidth, setWrapperWidth] = useState(0);

  useEffect(() => {
    const width = wrapperRef?.current?.offsetWidth;
    width && setWrapperWidth(width);
  }, [wrapperRef, wrapperRef?.current, additionalFields]);

  return (
    <Wrapper>
      <ContactHeaders
        additionalFields={additionalFields}
        addField={addField}
        deleteField={deleteField}
        widthRef={wrapperRef}
      />
      <ContactCards width={wrapperWidth} data-testid="contactCards">
        {contacts.map((contact, i) => (
          <ContactCard
            key={contact.firstName + i}
            contact={contact}
            clickHandler={onClickContactCard}
          />
        ))}
      </ContactCards>
    </Wrapper>
  );
};

const ContactCards = styled.div<{ width: number }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  ${(props) => `width: ${props.width}px`}
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  padding-bottom: 5px;
  border-radius: 4px;
  background-color: #404258;
  margin: 1% 0;
  overflow: auto;
  white-space: nowrap;
  flex: 1 1 auto;
`;
