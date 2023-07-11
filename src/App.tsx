import { styled, createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import TodoList from "./components/organisms/TodoList";
import Button from "./components/atoms/Button";
import AuthPage from "./components/organisms/AuthPage";
import { useState, useEffect } from "react";

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
  const [userId, setUserId] = useState<number>(0);

  useEffect(() => {
    const localIsLoggedInId = localStorage.getItem(`isLoggedIn`);
    setUserId(() => Number(localIsLoggedInId));
    setIsLoggedIn(!!localIsLoggedInId);
  }, [userId]);

  const onLogoutHandler = () => {
    console.log("logout");

    localStorage.removeItem(`isLoggedIn`);
    setIsLoggedIn(false);
  };

  return (
    <Container>
      <GlobalStyles />
      {isLoggedIn ? (
        <TodoList userId={userId} />
      ) : (
        <AuthPage
          setIsLoggedIn={setIsLoggedIn}
          setUserId={setUserId}
        />
      )}
      <Button onClick={onLogoutHandler}>로그아웃</Button>
    </Container>
  );
};

export default App;
