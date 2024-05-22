import { createGlobalStyle } from "styled-components";

const GlobalFormStyles = createGlobalStyle`




 form {

  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
 }

 h1 {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
 }


 div {
  margin-bottom: 20px;
 }


 label {
  display: block;
  font-size: 16px;
  margin-bottom: 5px;

 }


 input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
 }


 button {

  //width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #d2d2d2;
  color: #000000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
   background-color: #c0c0c0;
  }
 }


`
 export default GlobalFormStyles;