import { selectTodos } from "../../redux/todos/selectors"
import { useAppSelector } from "../../redux/hooks"
import { ToDoItem } from "../ToDoItem/ToDoItem";
import c from './ToDoList.module.css'

export default function ToDosList() {
    const todos = useAppSelector(selectTodos);

    return (
        <>
            <ul className={c.todosList}>
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