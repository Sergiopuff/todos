import React, {useRef, useEffect} from 'react';
import { useInput } from '../../hooks/useInput';

import './TodoForm.css';

export const TodoForm = (props) => {
    const [task, setTask, setTaskState] = useInput('')
    const input = useRef('');

    useEffect(() => {
        input.current.focus()
    },[])

    const handleKeyPress = (event) => {
        if (event.which === 13 && task.trim() !== "") {
            props.addTask(task)
            setTaskState('')
        } else if (event.which === 13 && task.trim() === "") {
            setTaskState('')
        }
    }

    const addTodo = () => {
        if (task.trim() !== "") {
            props.addTask(task)
            setTaskState('')
        } else {
            setTaskState('')
        }
    }

    return (
        <form 
            className={`${props.todosLength ? "shown" : "hidden"} todo-form`}
            onSubmit={(event) => event.preventDefault()}
        >
            <input
                ref={input}
                className="todo-form__input"
                type="text"
                value={task}
                onChange={setTask}
                onKeyPress={(event) => handleKeyPress(event)}
                placeholder="What needs to be done?"
            />
            <button 
                className="todo-form__btn"
                onClick={addTodo}
            >
                Add
            </button>
        </form>
    )
}