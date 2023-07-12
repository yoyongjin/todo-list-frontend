import React, { useCallback, useEffect, useRef } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import styled from "styled-components";
import { FetchedTodo, Todo } from "../../types";
import axios from "axios";
import { Socket } from "socket.io-client";

interface AddTodoFormProps {
  todos: FetchedTodo[];
  setTodos: React.Dispatch<React.SetStateAction<FetchedTodo[]>>;
  userId: number;
  socket: Socket;
}

interface BroadCaseData {
  room: string;
  newTodo: FetchedTodo;
}

const Form = styled.form`
  display: flex;
  justify-content: space-between;
`;

const AddTodoForm = ({ todos, setTodos, userId, socket }: AddTodoFormProps) => {
  console.log("AAAAAAAAAAAAAAAAAAddTodoForm");

  const inputRef = useRef<HTMLInputElement>(null);

  const addTodo = useCallback(
    async (newTodo: Todo) => {
      try {
        console.log(newTodo);

        // API 응답값으로 기존 배열의 값을 갱신시켜주기 (newTodo 쓰지말구)
        await axios
          .post("http://localhost:8080/api/todos", newTodo)
          .then((res) => {
            console.log("aaaaaaaaaaaaaa", res.data);
            setTodos((prev) => [...prev, res.data]);
          });

        // socket
        socket.emit("addTodo", { room: "room", newTodo });
      } catch (error) {
        console.error("Error posting todo:", error);
      }
    },
    [setTodos, socket]
  );

  const onSubmitHandler = (e: any) => {
    e.preventDefault();

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

  useEffect(() => {
    socket.on("newTodo", (data: BroadCaseData) => {
      setTodos((prevTodos) => [...prevTodos, data.newTodo]);
      console.log("shiiiiiiiiiiiiiiiiiiiiit", data.newTodo);
    });
  }, [setTodos, socket]);

  return (
    <Form onSubmit={onSubmitHandler}>
      <Input
        width="80%"
        placeholder="input todo"
        ref={inputRef}
      />
      <Button type="submit">ADD</Button>
    </Form>
  );
};

export default AddTodoForm;
