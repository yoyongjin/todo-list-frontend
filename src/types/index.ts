export interface User {
  email: string;
  password: string;
}

export interface Todo {
  content: string;
  checked?: boolean;
  userId?: number;
}

export interface FetchedTodo extends Todo {
  id: number;
}
