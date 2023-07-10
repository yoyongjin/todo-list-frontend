import React, { useRef, useCallback } from "react";
import { styled } from "styled-components";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { User } from "../../types";
import axios from "axios";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60vw;
  gap: 1rem;
`;
interface SignInFormProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignInForm = ({ setIsLoggedIn }: SignInFormProps) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const loginHandler = useCallback(
    async (user: User) => {
      try {
        await axios.post("http://localhost:8080/login", user);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error posting user:", error);
      }
    },
    [setIsLoggedIn]
  );

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    console.log("login");
    if (emailRef.current && passwordRef.current) {
      const user: User = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      await loginHandler(user);

      emailRef.current.value = "";
      passwordRef.current.value = "";
    }
  };

  return (
    <Form onSubmit={onSubmitHandler}>
      <Input
        placeholder="email"
        ref={emailRef}
      />
      <Input
        placeholder="password"
        ref={passwordRef}
      />
      <Button type="submit">로그인</Button>
    </Form>
  );
};

export default SignInForm;
