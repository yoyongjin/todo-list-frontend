import React, { useState } from "react";
import Button from "../atoms/Button";
import { Todo } from "../../types";
import styled from "styled-components";
import Input from "../atoms/Input";
import axios from "axios";

interface ListItemProps {
  id: number;
  content: string;
  fetchTodoList: () => Promise<void>;
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

const ListItem = ({ id, content, fetchTodoList }: ListItemProps) => {
  console.log(`ListItem ${id}: ${content} rendered`);

  // const [isChecked, setIsChecked] = useState<0 | 1>(0);

  const onCheckToggleHandler = async () => {
    try {
      await axios
        .patch(`http://localhost:8080/api/todo/${id}`, { checked: 1 })
        .then((res) => {
          console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", res.data);

          // setIsChecked((prev) => !prev);

          console.log(`${id}: checked is Successfully Patched!`);
          fetchTodoList();
        });
    } catch (error) {
      console.error(`Failed to patch checked...ㅠㅠㅠ`, error);
    }
  };

  const onDeleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/todo/${id}`).then((res) => {
        console.log(`${id}: ${content} is Successfully Deleted!`);
        fetchTodoList();
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
          onChange={onCheckToggleHandler}
        />
        <Button onClick={onDeleteHandler}>DEL</Button>
      </TodoStateBox>
    </Container>
  );
};

export default ListItem;
