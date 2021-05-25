import {
  ActionTypes,
  SET_TODOS,
  DELETE_TODO,
  UPDATE_TODO,
  TOGGLE_TODO,
  SET_NEWTODO,
  ADD_TODO,
  SET_MODE
} from './../actions/actions';
import { Store, Todo } from './../types/types';

/**
 * Implementation detail
 * 1)addTodo function
 * 2)deleteTodo function
 * 3)updateTodo function
 * 4)toggleTodo function
 */
const addTodo = (todos: Todo[], text: string): Todo[] => [
  ...todos,
  {
    id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
    text,
    done: false,
  },
];

const deleteTodo = (id: number, todos: Todo[]): Todo[] =>
  todos.filter((todo) => todo.id !== id)

const updateTodo = (todos: Todo[], id: number, text: string): Todo[] =>
  todos.map((todo) => (
    {
      ...todo, text: todo.id === id ? text : todo.text
    }
  )
  )

const toggleTodo = (todos: Todo[], id: number): Todo[] =>
  todos.map((todo) => (
    {
      ...todo, done: todo.id === id ? !todo.done : todo.done
    }
  )
  )

function reducers(state: Store = { todos: [], newTodo: '', mode: 'whitesmoke' }, action: ActionTypes) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        newTodo: '',
        todos: addTodo(state.todos, action.payload)
      }
    case SET_TODOS:
      return {
        ...state,
        todos: action.payload
      }
    case DELETE_TODO:
      return {
        ...state,
        todos: deleteTodo(action.payload, state.todos)
      }
    case UPDATE_TODO:
      return {
        ...state,
        todos: updateTodo(state.todos, action.payload.id, action.payload.text)
      }
    case TOGGLE_TODO:
      return {
        ...state,
        todos: toggleTodo(state.todos, action.payload)
      }
    case SET_NEWTODO:
      return {
        ...state,
        newTodo: action.payload
      }
    case SET_MODE:
      return {
        ...state,
        mode: action.payload
      }
    default:
      return state;
  }
}

export default reducers;