import { selectTodos } from "../../redux/todos/selectors"
import { useAppSelector } from "../../redux/hooks"
import { ToDoItem } from "../ToDoItem/ToDoItem";
import './ToDoList.module.css'

export default function ToDosList() {
    const todos = useAppSelector(selectTodos);

    return (
        <>
            <ul>
                {todos.map(item => (
                    <li key={item.id}>
                        <ToDoItem
                            id={ item.id}
                            name={item.name}
                            description={item.description } />
                    </li>
                ))}
            </ul>
            
        </>
    )
}