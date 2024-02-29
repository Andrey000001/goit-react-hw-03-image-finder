import styled from '@emotion/styled';
import { IoSearch } from 'react-icons/io5';

export const Search = styled(IoSearch)`
  width: 25px;
  height: 25px;
`;
export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 0px;
  background-color: #2039ba;
  text-align: center;
  box-shadow: 0px 4px 8px rgba(205, 192, 255, 0.6);
`;
export const Form = styled.form`
  display: flex;
  justify-content: center;
`;
export const Button = styled.button`
  position: absolute;
  background-color: transparent;
  border-color: transparent;
  z-index: 2;
  top: 19px;
  cursor: pointer;
  left: 37%;
`;

export const Input = styled.input`
  flex-grow: 1;
  max-width: 100px;
  position: relative;
  max-width: 400px;
  height: 40px;
  padding-left: 35px;
  border-radius: 4px;
  border-color: transparent;
  font-size: 18px;
`;
