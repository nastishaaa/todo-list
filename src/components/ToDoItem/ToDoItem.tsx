import { useAppDispatch } from "../../redux/hooks"
import { deleteTodo } from "../../redux/todos/operations"
import c from'./ToDoItem.module.css'

interface Props {
    id: string | null,
    name: string | null,
    description: string | null,
}

export const ToDoItem = ({id, name, description}: Props) => {
    
    const dispatch = useAppDispatch();

    const handleDelete = (id: string | null) => {
        if (!id) return;
        dispatch(deleteTodo(id));
    }


    return (
        <div className={c.todoItem}>
            <h4>{name}</h4>
            <p>{description}</p>
            <button type="button" onClick={() => handleDelete(id)}>Delete</button>
        </div>
    )
}