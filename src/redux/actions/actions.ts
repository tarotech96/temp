import { Todo } from "../types/types";

export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const SET_NEWTODO = "SET_NEWTODO";
export const SET_TODOS = "SET_TODOS";

export type ActionTypes =
  | { type: typeof SET_TODOS, payload: Todo[] }
  | { type: typeof ADD_TODO, payload: string }
  | { type: typeof DELETE_TODO, payload: number }
  | { type: typeof UPDATE_TODO, payload: { id: number, text: string } }
  | { type: typeof TOGGLE_TODO, payload: number }
  | { type: typeof SET_NEWTODO, payload: string }

// Add todo
export const addTodo = (text: string): ActionTypes => ({ type: ADD_TODO, payload: text })

// Set todo
export const setTodos = (todos: Todo[]): ActionTypes => ({ type: SET_TODOS, payload: todos })

// Delete todo
export const deleteTodo = (id: number): ActionTypes => ({ type: DELETE_TODO, payload: id })

// Update todo
export const updateTodo = (id: number, text: string): ActionTypes => ({ type: UPDATE_TODO, payload: { id, text } })

// Toggle todo
export const toggleTodo = (id: number): ActionTypes => ({ type: TOGGLE_TODO, payload: id })

// Set new todo
export const setNewTodo = (text: string): ActionTypes => ({ type: SET_NEWTODO, payload: text })