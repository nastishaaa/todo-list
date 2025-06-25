import { createAsyncThunk } from "@reduxjs/toolkit"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from '../../firebase/firebaseVar'
import { db } from "../../firebase/firebaseVar";
import { setDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";

interface UserData{
    name: string,
    email: string,
    password: string
}

interface RefreshPayload {
    name: string | null;
    email: string | null;
    token: string;
}


import { updateProfile } from "firebase/auth";
export const register = createAsyncThunk(
    'auth/registration',
    async ({ name, email, password }: UserData) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
            await updateProfile(userCredential.user, { displayName: name });

            const token = await userCredential.user.getIdToken();
            
            await setDoc(doc(db, "users", userCredential.user.uid), {
                email: userCredential.user.email,
                isAdmin: false, 
            });
  
            toast.success('User created!');
        
            return {
                name,
                email: userCredential.user.email,
                token,
            };
        } catch (error) {
            console.error('Error during registration:', error);
            toast.error("Something went wrong during registration!");
            throw error; 
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }: UserData) => {
        try {
            const userData = await signInWithEmailAndPassword(auth, email, password);
            const token = await userData.user.getIdToken();

            return {
                email: userData.user.email,
                name: userData.user.displayName,
                token,
            };
        } catch {
            toast.error('Login failed');
        
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        await signOut(auth);
    }
);

export const refresh = createAsyncThunk<RefreshPayload, void>(
    "auth/refresh",
    async (_, { rejectWithValue }) => {
        const user = auth.currentUser;
  
        if (!user) {
            return rejectWithValue("No user is currently logged in");
        }
  
        try {
            const token = await user.getIdToken();
            return {
                name: user.displayName,
                email: user.email,
                token,
            };
        } catch {
            return rejectWithValue("Failed to get token");
        }
    }
);