import { styled, createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import TodoList from "./components/organisms/TodoList";
import Button from "./components/atoms/Button";
import AuthPage from "./components/organisms/AuthPage";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const GlobalStyles = createGlobalStyle`
  ${reset};

  html {
    box-sizing: border-box;
  }
  
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
`;

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* background-color: #fcc; */
  border: 1px solid #ccc;
  gap: 15px;
`;

const socket = io("http://localhost:4000");

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(0);

  useEffect(() => {
    return () => {
      // 컴포넌트 언마운트 시 소켓 연결 해제
      socket.disconnect();
    };
  }, []);

  // 로그인 유지(localStorage)
  useEffect(() => {
    const localIsLoggedInId = localStorage.getItem(`isLoggedIn`);
    setUserId(Number(localIsLoggedInId));
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
        <TodoList
          userId={userId}
          socket={socket}
        />
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
