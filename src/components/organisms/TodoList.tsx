import { useState } from "react";
import Form from "../molecules/Form";
import styled from "styled-components";
import ListItem from "../molecules/ListItem";
import { Todo } from "../../types";

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

  return (
    <Container>
      <Form setTodos={setTodos} />
      <TodoListWrapper>
        {todos.map((todo) => {
          return (
            <ListItem
              key={todo.id}
              id={todo.id}
              text={todo.text}
            />
          );
        })}
      </TodoListWrapper>
    </Container>
  );
};

export default TodoList;
