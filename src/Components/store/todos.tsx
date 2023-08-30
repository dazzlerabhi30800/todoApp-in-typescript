import { ReactNode, createContext, useState, useContext, useEffect } from 'react';


export type TodosProviderProps = {
    children: ReactNode,
}


export type Todo = {
    id: string,
    task: string,
    completed: boolean,
    edit: boolean,
    createdAt: Date,
}


export type TodoContext = {
    todos: Array<Todo>,
    handleAddTodo: (task: string) => void; // call signature
    handleComplete: (id: string) => void;
    deleteTodo: (id: string) => void;
    handleEdit: (id: string) => void;
    completeEdit: (id: string, updatedTask: string) => void;
    setSortedTodos: (todos: Array<Todo>) => void;
}


export const todosContext = createContext<TodoContext | null>(null);


export default function TodoProvider({ children }: TodosProviderProps) {

    const [todos, setTodos] = useState<Array<Todo>>(JSON.parse(localStorage.getItem('todos') || "[]") || []);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos])


    useEffect(() => {
        setTodos(todos.map((todo) => {
            return { ...todo, edit: false };
        }));
    }, [])

    const handleAddTodo = (task: string) => {
        setTodos((prev) => {
            const newTodos: Array<Todo> = [
                {
                    id: Math.random().toString(),
                    task: task,
                    completed: false,
                    edit: false,
                    createdAt: new Date(),
                },
                ...prev
            ]
            return newTodos;
        })
    }


    const handleComplete = (id: string) => {
        setTodos((prev) => {
            let newTodos = prev.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed };
                }
                return todo;
            })

            return newTodos;
        })
    }


    const deleteTodo = (id: string) => {
        setTodos(todos.filter(todo => todo.id !== id));
    }



    const handleEdit = (id: string) => {
        setTodos(todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, edit: !todo.edit }
            }
            return todo;
        }))
    }


    const completeEdit = (id: string, updatedTask: string) => {
        setTodos(todos.map(todo => (
            todo.id === id ? { ...todo, task: updatedTask, edit: false } : todo
        )))
    }


    const setSortedTodos = (todos: Array<Todo>) => {
        setTodos(todos);
    }




    return (
        <todosContext.Provider value={{ todos, handleAddTodo, handleComplete, deleteTodo, handleEdit, completeEdit, setSortedTodos }}>
            {children}
        </todosContext.Provider>
    )
}




// consumer
export const useTodos = () => {
    const todosConsumer = useContext(todosContext);
    if (!todosConsumer) {
        throw new Error("use Todos used outside of Provider");
    }
    return todosConsumer;
}


