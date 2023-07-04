import React, { useState } from "react";
import Button from "../atoms/Button";
import { Todo } from "../../types";
import styled from "styled-components";
import Input from "../atoms/Input";

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

const ListItem = (todo: Todo) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const onCheckHandler = () => {
    setIsChecked((prev) => !prev);
  };
  console.log("isChecked of", todo.text, "is", isChecked);
  return (
    <Container>
      <span>{todo.text}</span>
      <TodoStateBox>
        <Input
          type="checkbox"
          onChange={onCheckHandler}
        />
        <Button>DEL</Button>
      </TodoStateBox>
    </Container>
  );
};

export default ListItem;
