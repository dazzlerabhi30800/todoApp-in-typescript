import { useTodos } from "./store/todos"
import { useSearchParams } from 'react-router-dom';



const Todos = () => {
    const { todos, handleComplete, deleteTodo } = useTodos();
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
            <div className="task" key={index}>
                <input type="checkbox" id={`${todo.id}--todo`} checked={todo.completed} onChange={() => handleComplete(todo.id)} />
                <label htmlFor={`${todo.id}--todo`}>{todo.task}</label>
                {todo.completed &&
                    <button onClick={() => deleteTodo(todo.id)}>Delete Button</button>
                }
            </div>
        ))}
    </div>
}

export default Todos;