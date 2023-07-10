import React, { useRef, useCallback } from "react";
import { styled } from "styled-components";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import axios from "axios";
import { User } from "../../types";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60vw;
  gap: 1rem;
`;

const SignUpForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const addUser = useCallback(async (newUser: User) => {
    try {
      await axios.post("http://localhost:8080/signup", newUser);
    } catch (error) {
      console.error("Error posting user:", error);
    }
  }, []);

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    console.log("signup");
    if (emailRef.current && passwordRef.current) {
      const newUser: User = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      addUser(newUser);

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
      <Button type="submit">회원가입</Button>
    </Form>
  );
};

export default SignUpForm;
