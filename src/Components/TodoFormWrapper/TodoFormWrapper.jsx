import React, {Fragment} from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { TodoForm } from '../TodoForm/TodoForm';

import './TodoFormWrapper.css';

 
export const TodoFormWrapper = ({todosLength, checkTodos, onMarkAllTodos, ...props}) => {
    return (
        <Fragment>
            {todosLength ? (
                <div className="todo-form-container">
                    <input 
                        id="form-checkbox"
                        className="todo-form-container__checkbox"
                        type="checkbox"
                        checked={checkTodos()}
                        onChange={checkTodos() ? () => onMarkAllTodos(false) : () => onMarkAllTodos(true)}
                    />
                    <label 
                        htmlFor="form-checkbox" 
                        className={todosLength ? "visible" : "invisible"}
                    >
                        <ExpandMoreIcon />
                    </label>
                    <TodoForm 
                        addTask={props.onAddTask}
                        todosLength={todosLength}
                    />
                </div>
            ) : (
                <TodoForm 
                    addTask={props.onAddTask}
                    todosLength={todosLength}
                />
            )}
        </Fragment>
    )
}