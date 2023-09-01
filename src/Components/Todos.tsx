import { useTodos } from "./store/todos";
import { useSearchParams } from "react-router-dom";
import EditInput from "./EditInput";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { BiSolidEditAlt, BiTrash } from 'react-icons/bi';

const Todos = () => {
    const { todos, handleComplete, deleteTodo, handleEdit } = useTodos();
    const [searchParams] = useSearchParams();
    let todosData = searchParams.get("todos");

    function filteredTodos() {
        switch (todosData) {
            case "completed":
                return todos.filter((todo) => todo.completed === true);
            case "active":
                return todos.filter((todo) => todo.completed !== true);
            default:
                return todos;
        }
    }

    let filteredData = filteredTodos();

    return (
        <Droppable droppableId="taskwrapper">
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="task-wrapper"
                >
                    {filteredData.map((todo, index) => (
                        <Draggable index={index} key={todo.id} draggableId={todo.id}>
                            {(provided) => (
                                <div
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                    className={`task ${todo.completed ? "completed" : ""}`}
                                    id={todo.id}
                                >
                                    <input
                                        type="checkbox"
                                        id={`${todo.id}--todo`}
                                        checked={todo.completed}
                                        onChange={() => handleComplete(todo.id)}
                                    />
                                    {todo.edit && <EditInput id={todo.id} edit={todo.edit} task={todo.task} />}
                                    {!todo.edit && (
                                        <label
                                            contentEditable={todo.edit}
                                            htmlFor={`${todo.id}--todo`}
                                        >
                                            {todo.task}
                                        </label>
                                    )}
                                    <div className="button__container">
                                        {!todo.completed && !todo.edit && (
                                            <button onClick={() => handleEdit(todo.id)}><BiSolidEditAlt /></button>
                                        )}
                                        <button onClick={() => deleteTodo(todo.id)}><BiTrash /></button>
                                    </div>
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default Todos;
