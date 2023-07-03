import React from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import styled from "styled-components";

const Container = styled.form`
  display: flex;
  justify-content: space-between;
`;

const Form = () => {
  const onSubmitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("asdf");
  };
  return (
    <Container>
      <Input
        width="80%"
        placeholder="input todo"
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
