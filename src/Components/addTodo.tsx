import { useState } from "react"
import { useTodos } from "./store/todos";

const AddTodo = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const { handleAddTodo } = useTodos();



    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputValue === '') return;
        handleAddTodo(inputValue);
        setInputValue("");
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button>Add</button>
        </form>
    )
}


export default AddTodo;