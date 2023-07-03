import React from "react";
import { styled, createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Form from "./components/molecules/Form";

const GlobalStyles = createGlobalStyle`
  ${reset};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fcc;
`;

const TodoListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  max-height: 500px;
  border-radius: 5px;
  padding: 20px;
  overflow: auto;
  background-color: #fff;
`;
const App = () => {
  return (
    <Container>
      <GlobalStyles />
      <TodoListContainer>
        <Form />
      </TodoListContainer>
    </Container>
  );
};

export default App;
