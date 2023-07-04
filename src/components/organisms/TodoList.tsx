import { useEffect, useState } from "react";
import Form from "../molecules/Form";
import styled from "styled-components";
import ListItem from "../molecules/ListItem";
import { Todo } from "../../types";
import axios from "axios";
import Button from "../atoms/Button";

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

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  console.log(todos);

  useEffect(() => {
    const fetchTodoList = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/todos");
        setTodos(res.data);
      } catch (error) {
        console.error("Error fetching todo list:", error);
      }
    };

    fetchTodoList();
  }, []);

  return (
    <Container>
      <Form setTodos={setTodos} />
      <TodoListWrapper>
        {todos.map((todo) => {
          return (
            <ListItem
              key={todo.id}
              id={todo.id}
              content={todo.content}
              setTodos={setTodos}
            />
          );
        })}
      </TodoListWrapper>
    </Container>
  );
};

export default TodoList;
