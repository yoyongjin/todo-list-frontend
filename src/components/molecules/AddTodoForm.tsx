import React, { useCallback, useMemo, useRef } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import styled from "styled-components";
import { Todo } from "../../types";
import axios from "axios";

interface AddTodoFormProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const Form = styled.form`
  display: flex;
  justify-content: space-between;
`;

const AddTodoForm = ({ todos, setTodos }: AddTodoFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const maxId: number = useMemo(() => {
    console.log("todos.length???? ", todos.length);

    if (todos.length > 0) {
      return Math.max(...todos.map((todo) => todo.id));
    } else {
      return 0;
    }
  }, [todos]);

  const addTodo = useCallback(
    async (newTodo: Todo) => {
      try {
        await axios.post("http://localhost:8080/api/todos", newTodo);

        setTodos([...todos, newTodo]);
      } catch (error) {
        console.error("Error posting todo:", error);
      }
    },
    [setTodos, todos]
  );

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    console.log("maxId=========", maxId);
    console.log(todos);
    if (inputRef.current) {
      console.log(inputRef.current.value);
      const newTodo: Todo = {
        id: maxId + 1,
        content: inputRef.current.value,
        checked: false,
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
