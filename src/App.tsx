import React, { ReactElement, useState } from "react";
import "./App.css";
import styled from "styled-components";
import TodoList from "./TodoList";
import { Store } from "./redux/types/types";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, setMode } from "./redux/actions/actions";
import Pokemon from "./Pokemon";

const DARK_MODE = "#212121";
const LIGHT_MODE = "#f9e0dd";

const App: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const { todos, mode } = useSelector((state: Store) => state);
  const [text, setText] = useState<string>("");
  const [showPokemon, setShowPokemon] = useState<boolean>(false);
  return (
    <Container style={{ backgroundColor: `${mode}` }}>
      <h1
        style={{
          color: `${mode === DARK_MODE ? "#fff" : "#000"}`,
        }}
      >
        Todo List
      </h1>
      <Mode>
        <button onClick={() => dispatch(setMode(DARK_MODE))}>
          <i
            className="fas fa-moon"
            style={{
              color: `${mode === DARK_MODE ? "#fff" : "rgba(0, 0, 0, 0.54)"}`,
            }}
          ></i>{" "}
          Dark mode
        </button>
        <button onClick={() => dispatch(setMode(LIGHT_MODE))}>
          <i
            className="far fa-moon"
            style={{
              color: `${mode === DARK_MODE ? "#fff" : "rgba(0, 0, 0, 0.54)"}`,
            }}
          ></i>{" "}
          Light mode
        </button>
      </Mode>
      <AddList>
        <input
          type="text"
          value={text}
          placeholder="Enter text..."
          onChange={(event) => setText(event.target.value)}
        />
        <button
          onClick={() => {
            setShowPokemon(false);
            dispatch(addTodo(text));
          }}
        >
          Add New
        </button>
        <button onClick={() => setShowPokemon(true)}>Generate</button>
      </AddList>
      {!showPokemon && <TodoList todos={todos} />}
      {showPokemon && <Pokemon />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  height: 100%;

  h1 {
    font-size: 2rem;
    font-weight: bolder;
    font-family: "Montserrat";
  }
`;

const Mode = styled.div`
  margin: 1rem 0;

  button {
    width: 300px;
    height: 40px;
    margin: 0 1rem;
    border-radius: 5px;
    font-size: 1.2rem;
    font-family: "Montserrat";
    border-width: 1px;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.54);
    color: #fff;

    :hover {
      opacity: 0.7;
    }
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
    border-width: 1px;
    margin-right: 1rem;
  }

  button {
    width: 150px;
    height: 40px;
    font-size: 1rem;
    background-color: #1976d2;
    color: #fff;
    border-radius: 5px;
    margin-left: 1rem;
    cursor: pointer;
    font-family: "Montserrat";
    border-width: 1px;

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
