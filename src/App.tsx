import React, { ReactElement, useState } from "react";
import "./App.css";
import styled from "styled-components";
import TodoList from "./TodoList";
import { Store } from "./redux/types/types";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "./redux/actions/actions";

const App: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const todos = useSelector((state: Store) => state.todos);
  const [text, setText] = useState<string>("");
  return (
    <Container>
      <h1>Todo List</h1>
      <AddList>
        <input
          type="text"
          value={text}
          placeholder="Enter text..."
          onChange={(event) => setText(event.target.value)}
        />
        <button onClick={() => dispatch(addTodo(text))}>Add New</button>
      </AddList>
      <TodoList todos={todos} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: whitesmoke;
  width: 800px;
  margin: auto;
  height: 100vh;

  h1 {
    font-size: 3rem;
    font-weight: bolder;
    font-family: "Montserrat";
  }
`;

const AddList = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;

  input {
    width: 500px;
    height: 40px;
    border-radius: 5px;
    outline: none;
    font-size: 1.3rem;
    font-family: "Montserrat";
  }

  button {
    width: 150px;
    height: 40px;
    font-size: 1.2rem;
    background-color: #1976d2;
    color: #fff;
    border-radius: 5px;
    margin: 0 1rem;
    cursor: pointer;
    font-family: "Montserrat";

    :hover {
      opacity: 0.8;
    }
  }

  @media screen and (max-width: 700px) {
    flex-direction: column;

    button {
      margin-top: 1rem;
    }
  }
`;

export default App;
