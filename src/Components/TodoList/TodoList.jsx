import React from 'react';
import {TodoItem} from '../TodoItem/TodoItem';

import './TodoList.css';
 
export const TodoList = (props) => {
    return (
        <div className="todo-list">
            {props.todosData.map(item => <TodoItem 
                key={item._id} 
                item={item} 
                id={item._id} 
                removeItem={props.onRemoveTodo} 
                markTodoDone={props.onChangeStatus}
                editText={props.editText}
            />)}
        </div>
    )
}