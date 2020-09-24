import React, { useState, useRef, useEffect } from 'react';
import DoneIcon from '@material-ui/icons/Done';

import './TodoItem.css';

export const TodoItem = (props) => {
    const [text, setText] = useState(props.item.text);
    const [edit, setEdit] = useState(false);
    const inputTodo = useRef('');

    useEffect(() => {
        if (edit) inputTodo.current.focus()
    },[edit])

    const todoClass = props.item.done ? "done" : "undone";

    const onClickClose = (id) => {
        props.removeItem(id);
    }

    const onClickDone = (id, done) => {
        props.markTodoDone(id, done);
    }

    const handleEditClick = () => {
        setEdit(true)
    }
 
    const cancelEdit = (id) => {
        if (text.length && text.trim() !== "") {
            setEdit(false)
            props.editText(id, text)
        } else {
            props.removeItem(id)
        }
    }

    const handleKeyPress = (event) => {
        const id = props.item._id
        if (event.which === 13 && text.length && text.trim() !== "") {
            setEdit(false)
            props.editText(id, text)
        } else if (event.which === 13 && text.trim() === "") {
            props.removeItem(id)
        }
    }

    return (
        <div className="todo-item">
            <input id={props.item._id}
                className="todo-item__checkbox" 
                type="checkbox" 
                checked={props.item.done}
                onChange={() => onClickDone(props.item._id, props.item.done)}
                />
            <label htmlFor={props.item._id}>
                <DoneIcon className="done-icon" />
            </label>
            {edit ? (
                <input
                ref={inputTodo}
                onKeyPress={(event) => handleKeyPress(event)}
                onChange={(event) => setText(event.currentTarget.value)}
                onBlur={()=> cancelEdit(props.item._id)}
                className={`${todoClass} todo-item__text todo-item__text-input`}
                value={text}
            />
            ) : (
                <p 
                    className={`${todoClass} todo-item__text`} 
                    onDoubleClick={() => handleEditClick()}
                >
                    {text}
                </p>
            )}
            <button
                className="todo-item__btn"
                onClick={() => onClickClose(props.item._id)}
            >
                &#215;
            </button>
        </div>
    )
}