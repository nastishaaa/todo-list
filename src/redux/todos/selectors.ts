import type { RootState } from '../store'

export const selectTodos = (state: RootState) => state.todo.todos;
export const selectIsLoading = (state: RootState) => state.todo.isLoading;
export const selectError = (state: RootState) => state.todo.isError;