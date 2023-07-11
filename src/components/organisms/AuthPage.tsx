import React from "react";
import SignUpForm from "../molecules/SignUpForm";
import SignInForm from "../molecules/SignInForm";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  border-radius: 5px;
  gap: 20px;
  padding: 50px 20px;
  background-color: #fff;
`;
interface AuthPageProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUserId: React.Dispatch<React.SetStateAction<number>>;
}
const AuthPage = ({ setIsLoggedIn, setUserId }: AuthPageProps) => {
  return (
    <Container>
      <SignUpForm />
      <SignInForm
        setIsLoggedIn={setIsLoggedIn}
        setUserId={setUserId}
      />
    </Container>
  );
};

export default AuthPage;
