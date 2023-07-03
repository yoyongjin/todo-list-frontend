import React from "react";
import Button from "../atoms/Button";
import { Todo } from "../../types";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 1rem;
`;

const ListItem = (todo: Todo) => {
  return (
    <Container>
      <span>{todo.text}</span>
      <Button>DEL</Button>
    </Container>
  );
};

export default ListItem;
