import styled from "styled-components";

interface Props {
  clickHandler: () => void;
}

export const NewContactButton = ({ clickHandler }: Props) => {
  return <Button onClick={clickHandler}>Add New Contact</Button>;
};

const Button = styled.button`
  width: 100%;
  height: 100%;
  max-height: 50px;
  min-height: 25px;
  cursor: pointer;
  color: white;
  background-color: #395b64;
  border: none;
  border-radius: 2px;
  &:hover {
    background-color: #4a6c75;
  }
`;
