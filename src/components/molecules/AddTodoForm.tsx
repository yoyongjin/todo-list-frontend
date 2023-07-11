import React, { useCallback, useMemo, useRef } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import styled from "styled-components";
import { FetchedTodo, Todo } from "../../types";
import axios from "axios";

interface AddTodoFormProps {
  todos: FetchedTodo[];
  setTodos: React.Dispatch<React.SetStateAction<FetchedTodo[]>>;
  userId: number;
}

const Form = styled.form`
  display: flex;
  justify-content: space-between;
`;

const AddTodoForm = ({ todos, setTodos, userId }: AddTodoFormProps) => {
  console.log("AAAAAAAAAAAAAAAAAAddTodoForm");

  const inputRef = useRef<HTMLInputElement>(null);

  const addTodo = useCallback(
    async (newTodo: Todo) => {
      try {
        await axios.post("http://localhost:8080/api/todos", newTodo);
        const newTodoId = todos.length ? todos.length + 1 : 1;
        console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnn", newTodoId);
        setTodos([...todos, { ...newTodo, id: newTodoId }]);
      } catch (error) {
        console.error("Error posting todo:", error);
      }
    },
    [setTodos, todos]
  );

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    // console.log("maxId=========", maxId);
    console.log(todos);

    if (inputRef.current) {
      console.log(inputRef.current.value);

      const newTodo: Todo = {
        content: inputRef.current.value,
        checked: false,
        userId: userId,
      };

      addTodo(newTodo);

      inputRef.current.value = "";
    }
  };

  return (
    <Form>
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
    </Form>
  );
};

export default AddTodoForm;
