import { useTodos } from "./store/todos"
import { useSearchParams } from 'react-router-dom';
import EditInput from "./EditInput";



const Todos = () => {
    const { todos, handleComplete, deleteTodo, handleEdit } = useTodos();
    const [searchParams] = useSearchParams();
    let todosData = searchParams.get("todos");


    function filteredTodos() {
        switch (todosData) {
            case "completed":
                return todos.filter(todo => todo.completed === true);
            case "active":
                return todos.filter(todo => todo.completed !== true);
            default:
                return todos;
        }
    }

    let filteredData = filteredTodos();


    return <div className="task-wrapper">
        {filteredData.map((todo, index) => (
            <div className={`task ${todo.completed ? "completed" : ""}`} key={index}>
                <input type="checkbox" id={`${todo.id}--todo`} checked={todo.completed} onChange={() => handleComplete(todo.id)} />
                {todo.edit &&
                    <EditInput id={todo.id} task={todo.task} />
                }
                {!todo.edit &&
                    <label contentEditable={todo.edit} htmlFor={`${todo.id}--todo`}>{todo.task}</label>
                }
                {!todo.completed && !todo.edit &&
                    <button onClick={() => handleEdit(todo.id)}>Edit</button>
                }
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
        ))}
    </div>
}

export default Todos;