import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import ListItem from "../molecules/ListItem";
import AddTodoForm from "../molecules/AddTodoForm";
import { Todo } from "../../types";
import axios from "axios";

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
  console.log("ttttttttttttttodolist");

  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodoList = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/todos");
      setTodos(res.data);
    } catch (error) {
      console.error("Error fetching todo list:", error);
    }
  }, []);

  // todo_db에서 todos 가져오기
  useEffect(() => {
    console.log("GET: fetch Todo List from todo_db ");
    fetchTodoList();
  }, [fetchTodoList]);

  console.log(todos);
  return (
    <Container>
      <AddTodoForm
        todos={todos}
        setTodos={setTodos}
      />
      <TodoListWrapper>
        {todos.map((todo) => {
          return (
            <ListItem
              key={todo.id}
              id={todo.id}
              content={todo.content}
              setTodos={setTodos}
              fetchTodoList={fetchTodoList}
            />
          );
        })}
      </TodoListWrapper>
    </Container>
  );
};

export default TodoList;
