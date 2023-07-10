import { styled, createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import TodoList from "./components/organisms/TodoList";
import AuthPage from "./components/organisms/AuthPage";
import { useState } from "react";

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
  gap: 15px;
`;

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <Container>
      <GlobalStyles />
      {isLoggedIn ? <TodoList /> : <AuthPage setIsLoggedIn={setIsLoggedIn} />}
    </Container>
  );
};

export default App;
