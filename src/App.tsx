import { styled, createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import TodoList from "./components/organisms/TodoList";
import Button from "./components/atoms/Button";
import AuthPage from "./components/organisms/AuthPage";
import { useState, useEffect } from "react";
import socketIO from "socket.io-client";

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

const socket = socketIO("http://localhost:4000");

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(0);

  // 소켓 연결 message
  const [message, setMessage] = useState<string>("");
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);

  useEffect(() => {
    // 서버로부터 메시지를 받았을 때의 처리 로직
    socket.on("message", (data: any) => {
      console.log("서버로부터 메시지를 받았습니다:", data);
      setReceivedMessages((messages) => [...messages, data]);
    });

    return () => {
      // 컴포넌트 언마운트 시 소켓 연결 해제
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    // 메시지를 서버로 전송
    socket.emit("message", message);
    setMessage("");
  };

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
