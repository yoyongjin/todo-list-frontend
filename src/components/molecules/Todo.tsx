import React from "react";
import Button from "../atoms/Button";

const Todo = (todo: string) => {
  return (
    <div>
      <span>{todo}</span>
      <Button>DEL</Button>
    </div>
  );
};

export default Todo;
