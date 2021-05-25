import React, { ReactElement } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { deleteTodo, toggleTodo, updateTodo } from "./redux/actions/actions";
import { Todo } from "./redux/types/types";

const TodoList: React.FC<{ todos: Todo[] }> = ({ todos }): ReactElement => {
  const dispatch = useDispatch();
  return todos.length ? (
    <List>
      <ul>
        {todos.map((todo: Todo, index: number) => (
          <li key={index}>
            <input
              type="text"
              className={todo.done ? "active" : ""}
              value={todo.text}
              onChange={(event) =>
                dispatch(updateTodo(todo.id, event.target.value))
              }
            />
            <i
              className={`fas fa-check-circle ${todo.done && "active"}`}
              onClick={() => dispatch(toggleTodo(todo.id))}
            ></i>
            <i
              className="fas fa-trash"
              onClick={() => dispatch(deleteTodo(todo.id))}
            ></i>
          </li>
        ))}
      </ul>
    </List>
  ) : (
    <div></div>
  );
};

const List = styled.div`
  ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    li {
      list-style: none;
      margin: 1rem 0;
      display: flex;
      align-items: center;

      input {
        width: 500px;
        padding: 10px;
        outline: none;
        border: none;
        background-color: whitesmoke;
        font-family: "Montserrat";
        border-bottom: 1px solid rgba(0, 0, 0, 0.54);
      }

      input.active,
      .fas.active {
        color: #1976d2;
      }

      i {
        position: relative;
        top: 0;
        right: 5rem;
        font-size: 1.3rem;
        cursor: pointer;
        color: rgba(0, 0, 0, 0.54);
        margin: 0 10px;
      }
    }
  }
`;

export default TodoList;
