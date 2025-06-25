import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/firebaseVar";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";

interface TodoData {
  name: string;
  description: string;
}

export const addTodo = createAsyncThunk(
  'todos/add',
    async ({ name, description }: TodoData) => {
        try {
            const docRef = await addDoc(collection(db, "todos"), {
                name,
                description,
            });
            return { id: docRef.id, name, description };
        } catch {
            toast.error('You cannot add todo. Register first!')
        }
    }
    
);

export const fetchTodos = createAsyncThunk(
    'todos/fetch',
    async () => {
        const querySnapshot = await getDocs(collection(db, "todos"));
        const todos: { id: string; name: string; description: string }[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            todos.push({
                id: doc.id,
                name: data.name,
                description: data.description,
            });
        });
        return todos;
    }
);

interface UpdateTodoData {
    id: string;
    name: string;
    description: string;
}

export const updateTodo = createAsyncThunk(
    'todos/update',
    async ({ id, name, description }: UpdateTodoData) => {
        const docRef = doc(db, "todos", id);
        await updateDoc(docRef, { name, description });
        return { id, name, description };
    }
);

export const deleteTodo = createAsyncThunk(
    'todos/delete',
    async (id: string) => {
        try {
            await deleteDoc(doc(db, "todos", id));
            return id;
        } catch {
            toast.error('You cannot delete task. Register first!')
        }
        
    }
);


