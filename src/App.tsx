import React from "react";
import { styled, createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import TodoList from "./components/organisms/TodoList";

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

const App = () => {
  return (
    <Container>
      <GlobalStyles />
      <TodoList />
    </Container>
  );
};

export default App;
