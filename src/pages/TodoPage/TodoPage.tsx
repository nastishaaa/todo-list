import { Link } from "react-router-dom"
import ToDosList from "../../components/ToDosList/ToDosList"
import { AddTaskForm } from "../../components/AddTaskForm/AddTaskForm"
import './TodoPage.module.css'

export default function TodoPage() {
    return (
        <>
            <h2>Your Todo</h2>
            <p>If you want to manipulate your tasks, <Link to='/registration'>Register Now</Link>!</p>
            <AddTaskForm />
            <ToDosList />
        
        </>
    )
}