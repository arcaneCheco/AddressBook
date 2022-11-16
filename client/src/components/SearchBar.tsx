import styled from "styled-components";

interface Props {
  onChange: (value: string) => void;
  searchFilter: string;
}

export const SearchBar = ({ onChange, searchFilter }: Props) => {
  return (
    <Form onSubmit={(event) => event.preventDefault()}>
      <Input
        type="text"
        placeholder="Search for contact"
        name="search"
        value={searchFilter}
        onChange={(event) => onChange(event.target.value)}
      />
      <ClearInput onClick={() => onChange("")}>
        <Paragraph>clear</Paragraph>
      </ClearInput>
    </Form>
  );
};

const Form = styled.form`
  height: 100%;
  max-height: 50px;
  min-height: 25px;
  align-self: flex-end;
  width: 100%;
  display: flex;
  position: relative;
  cursor: pointer;
`;

const Input = styled.input`
  width: 100%;
  padding-left: 10px;
`;

const ClearInput = styled.div`
  color: grey;
  position: absolute;
  right: 20px;
  display: flex;
  align-items: center;
  height: 100%;
`;

const Paragraph = styled.p`
  font-size: 20px;
  vertical-align: text-top;
`;
