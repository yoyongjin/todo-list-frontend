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
  setUserId: React.Dispatch<React.SetStateAction<number>>;
}

const SignInForm = ({ setIsLoggedIn, setUserId }: SignInFormProps) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const loginHandler = useCallback(
    async (user: User) => {
      try {
        await axios.post("http://localhost:8080/login", user).then((res) => {
          console.log("서버에서 가져온 userId", res.data.userId);
          setUserId(res.data.userId);
          setIsLoggedIn(true);
          localStorage.setItem(`isLoggedIn_${res.data.userId}`, "true");
        });
      } catch (error) {
        console.error("Error posting user:", error);
      }
    },
    [setIsLoggedIn, setUserId]
  );

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    console.log("login");
    if (emailRef.current && passwordRef.current) {
      const user: User = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      loginHandler(user);

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
