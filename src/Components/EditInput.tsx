import { useState } from 'react';
import { useTodos } from './store/todos';
import { GrUpdate } from 'react-icons/gr';


interface EditProps {
    task: string,
    id: string,
    edit: boolean
}



export default function EditInput({ task, id, edit }: EditProps) {
    const [editText, setEditText] = useState<string>(task);
    const { completeEdit } = useTodos();
    return (
        <div className='edit__wrapper'>
            <input onKeyDown={(e) => e.key === 'Enter' && completeEdit(id, editText)} autoFocus={edit} type="text" value={editText} onChange={(e) => setEditText(e.target.value)} />
            <button onClick={() => completeEdit(id, editText)}><GrUpdate /></button>
        </div>
    )
}