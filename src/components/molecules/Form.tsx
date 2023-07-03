import React, { useRef } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import styled from "styled-components";

const Container = styled.form`
  display: flex;
  justify-content: space-between;
`;

const Form = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (inputRef.current) {
      const value = inputRef.current.value;
      console.log(value);
    } else {
      console.log("inputRef.current is null!!!!!!!!!!!");
    }
  };

  return (
    <Container>
      <Input
        width="80%"
        placeholder="input todo"
        ref={inputRef}
      />
      <Button
        type="submit"
        onClick={onSubmitHandler}
      >
        ADD
      </Button>
    </Container>
  );
};

export default Form;
