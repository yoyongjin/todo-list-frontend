import React, { useState } from "react";
import Button from "../atoms/Button";
import { Todo } from "../../types";
import styled from "styled-components";
import Input from "../atoms/Input";
import axios from "axios";

interface ListItemProps {
  id: number;
  content: string;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 1rem;
`;

const TodoStateBox = styled.div`
  display: flex;
  align-items: center;
`;

const ListItem = ({ id, content, setTodos }: ListItemProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const onCheckHandler = () => {
    setIsChecked((prev) => !prev);
  };
  console.log("isChecked of", content, "is", isChecked);

  const onDeleteHandler = async () => {
    console.log("delete");

    try {
      await axios.delete(`http://localhost:8080/api/todo/${id}`).then((res) => {
        console.log(`${content} is Successfully Deleted!`);
        setTodos((todos: Todo[]) => todos.filter((todo) => todo.id !== id));
      });
    } catch (error) {
      console.error(`Failed to delete ${content}...ㅠㅠㅠ`, error);
    }
  };

  return (
    <Container>
      <span>{content}</span>
      <TodoStateBox>
        <Input
          type="checkbox"
          onChange={onCheckHandler}
        />
        {isChecked ? <Button onClick={onDeleteHandler}>DEL</Button> : ""}
      </TodoStateBox>
    </Container>
  );
};

export default ListItem;
