import styled from "styled-components";
import { Contact } from "../App";
import { parseName } from "../helpers";

interface Props {
  contact: Contact;
  clickHandler: (id: string) => void;
}

export const ContactCard = ({ contact, clickHandler }: Props) => {
  return (
    <Wrapper
      onClick={(event) => clickHandler(event.currentTarget.id)}
      id={contact.id}
      data-testid="contactCard"
    >
      <ContactField width={200}>
        <Paragraph>{parseName(contact)}</Paragraph>
      </ContactField>
      <ContactField width={200}>
        <Paragraph>{contact.mobile}</Paragraph>
      </ContactField>
      {Object.values(contact.additionalFields).map((entry, i) => (
        <ContactField key={entry + i} width={200}>
          <Paragraph>{entry}</Paragraph>
        </ContactField>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 50px;
  min-height: 50px;
  background-color: #50577a;
  display: flex;
  align-items: center;
  color: white;
  padding: 0 20px;
  &:hover {
    background-color: #6b728e;
    cursor: pointer;
  }
`;

const ContactField = styled.div<{ width: number }>`
  width: ${(props) => props.width + "px"};
`;

const Paragraph = styled.p`
  width: calc(90%);
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
