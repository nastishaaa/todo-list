import { createSlice } from "@reduxjs/toolkit";
import { addTodo, fetchTodos, updateTodo, deleteTodo } from "./operations";

export interface ToDoesSlice {
    id: string | null,
    name: string | null,
    description: string | null,
}

interface ToDosState {
    todos: ToDoesSlice[],
    isLoading: boolean,
    isError: boolean,
}

const initialState: ToDosState = {
    todos: [],
    isLoading: false,
    isError: false,
}

const slice = createSlice({
    name: 'todo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addTodo.fulfilled, (state, action) => {
                if (!action.payload) return;
                
                state.todos.push(action.payload);  
                state.isError = false;
                state.isLoading = false;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.todos = action.payload;
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                const index = state.todos.findIndex(todo => todo.id === action.payload.id);
                
                
                if (index !== -1) {
                    state.todos[index] = action.payload;  
                }
                state.isError = false;
                state.isLoading = false;
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.todos = state.todos.filter(todo => todo.id !== action.payload);
        })
    }
});

export default slice.reducer;