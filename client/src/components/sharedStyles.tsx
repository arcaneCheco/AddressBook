import styled from "styled-components";

export const ContactForm = styled.form`
  border: 4px solid black;
  border-radius: 4px;
  background: #ffffff88;
  position: relative;
  min-height: 500px;
  min-width: 500px;
  width: 40%;
  padding: 50px 25px 25px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CloseContactForm = styled.button`
  background-color: black;
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px;
  color: white;
  border: none;
  cursor: pointer;
`;

export const ContactFormInput = styled.input`
  height: 40px;
  min-height: 40px;
  width: 100%;
  padding-left: 10px;
`;

export const ContactFormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
`;
