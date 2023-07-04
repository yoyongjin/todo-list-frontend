import React, { useRef } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import styled from "styled-components";
import { Todo } from "../../types";

interface FormProps {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const Container = styled.form`
  display: flex;
  justify-content: space-between;
`;

const Form = ({ setTodos }: FormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (inputRef.current) {
      console.log(inputRef.current.value);
      const newTodo = {
        id: Date.now(),
        content: inputRef.current.value,
      };
      setTodos((prev: Todo[]) => [...prev, newTodo]);
      inputRef.current.value = "";
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
