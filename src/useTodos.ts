import { ActionTypes, ADD_TODO, DELETE_TODO } from './redux/actions/actions';
import { useCallback, useReducer } from 'react';
import { Todo } from './redux/types/types';

/**
 * custom hooks useTodos 
 * @param initialState 
 * @returns Todo[], addTodo(), removeTodo()
 */

const useTodos = (initialState: Todo[]): {
  todos: Todo[],
  addTodo: (text: string) => void,
  removeTodo: (id: number) => void
} => {
  const [todos, dispatch] = useReducer((state: Todo[], action: ActionTypes) => {
    switch (action.type) {
      case ADD_TODO:
        return [...state,
        {
          id: Math.max(0, Math.max(...state.map(({ id }) => id)) + 1),
          text: action.payload,
          done: false
        }
        ]
      case DELETE_TODO:
        return [...state.filter(el => el.id !== action.payload)]
      default:
        return state;
    }
  }, initialState);

  // add new todo
  const addTodo = useCallback((text: string) => {
    dispatch({ type: ADD_TODO, payload: text })
  }, [])

  // remove todo
  const removeTodo = useCallback((id: number) => {
    dispatch({ type: DELETE_TODO, payload: id })
  }, [])
  return {
    todos,
    addTodo,
    removeTodo
  }
}

export default useTodos;