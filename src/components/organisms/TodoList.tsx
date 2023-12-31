import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import ListItem from "../molecules/ListItem";
import AddTodoForm from "../molecules/AddTodoForm";
import { FetchedTodo } from "../../types";
import axios from "axios";
import { Socket } from "socket.io-client";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  width: 60%;
  max-height: 500px;
  border-radius: 5px;
  padding: 20px;
  background-color: #fff;
`;

const TodoListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  gap: 5px;
`;

interface TodoListProps {
  userId: number;
  socket: Socket;
}

const TodoList = ({ userId, socket }: TodoListProps) => {
  console.log("ttttttttttttttodolist");

  const [todos, setTodos] = useState<FetchedTodo[]>([]);

  const fetchTodoList = useCallback(async () => {
    console.log("fetchTodoList");

    try {
      const res = await axios.get(`http://localhost:8080/user/todo/${userId}`);
      setTodos(res.data.todos);

      console.log("ddddddd00ddd", res.data.todos);
    } catch (error) {
      console.error("Error fetching todo list:", error);
    }
  }, [userId]);

  // todo_db에서 todos 가져오기
  useEffect(() => {
    console.log("GET: fetch Todo List from todo_db ");
    fetchTodoList();
    socket.emit("joinRoom", "room");

    return () => {
      socket.disconnect();
    };
  }, [fetchTodoList, socket]);

  // todo_db에서 user_id가 일치하는 todo가져오기

  console.log(todos);
  return (
    <Container>
      <AddTodoForm
        todos={todos}
        setTodos={setTodos}
        userId={userId}
        socket={socket}
      />
      <TodoListWrapper>
        {todos.map((todo) => {
          return (
            <ListItem
              key={todo.id}
              id={todo.id}
              content={todo.content}
              fetchTodoList={fetchTodoList}
            />
          );
        })}
      </TodoListWrapper>
    </Container>
  );
};

export default TodoList;
