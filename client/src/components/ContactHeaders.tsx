import { RefObject, useState } from "react";
import styled from "styled-components";

interface Props {
  additionalFields: Array<string>;
  addField: (field: string) => void;
  deleteField: (field: string) => void;
  widthRef: RefObject<HTMLDivElement>;
}

export const ContactHeaders = ({
  additionalFields,
  addField,
  deleteField,
  widthRef,
}: Props) => {
  const [newField, setNewField] = useState("");

  return (
    <Wrapper ref={widthRef}>
      <HeaderField width={200}>Name</HeaderField>
      <HeaderField width={200}>Phone</HeaderField>
      {additionalFields.map((field, index) => (
        <HeaderField key={field + index} width={200} id={field}>
          <p>{field}</p>
          <DeleteFieldButton
            onClick={(event) => {
              const fieldToDelete = event?.currentTarget?.parentElement?.id;
              fieldToDelete && deleteField(fieldToDelete);
            }}
          >
            X
          </DeleteFieldButton>
        </HeaderField>
      ))}
      <AddFieldHeader width={200}>
        <AddFieldInput
          type="text"
          placeholder="Add Field"
          value={newField}
          onChange={(event) => setNewField(event.target.value)}
        />
        <FieldButton
          onClick={() => {
            addField(newField);
            setNewField("");
          }}
        >
          ADD
        </FieldButton>
      </AddFieldHeader>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 50px;
  border-bottom: 3px solid white;
  font-size: 20px;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
  padding-right: 0;
  min-width: 100%;
  width: fit-content;
`;

const HeaderField = styled.div<{ width: number }>`
  width: ${(props) => props.width + "px"};
  min-width: ${(props) => props.width + "px"};
  position: relative;
  display: flex;
`;

const AddFieldHeader = styled(HeaderField)`
  margin-left: auto;
`;

const AddFieldInput = styled.input`
  border: 0;
  outline: 0;
  color: white;
  font-size: 20px;
  width: 100%;
  background-color: #00000077;
  &::placeholder {
    color: #999999;
    font-size: 20px;
  }
`;

const FieldButton = styled.button`
  position: absolute;
  right: 0;
  height: 100%;
  cursor: pointer;
  background-color: black;
  color: white;
  border: none;
  padding: 2px;
`;

const DeleteFieldButton = styled.button`
  width: 20px;
  margin-left: 5px;
  border: none;
  background-color: #c74b50;
  cursor: pointer;
  color: white;
  border-radius: 4px;
`;
