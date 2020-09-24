import React from 'react';
import './TaskPanel.css';

export const TaskPanel = (props) => {
    const handleClickChange = (filter) => {
        props.filterHandler(filter.value)
    }

    const filters = props.filters.map(filter => {
        const btnClassName = props.activeFilter === filter.value
            ? "task-panel__btn active-filter" 
            : "task-panel__btn";

        return (
            <button
                aria-pressed={true}
                key={filter.id}
                id={filter.id}
                className={btnClassName}
                onClick={() => handleClickChange(filter)}
            >
                {filter.value}
            </button>
        )
    })

    const checkOneCompleted =() => {
        const checkCompletedTodo = props.filteredTodos.findIndex(todo => todo.done === true)
            if (checkCompletedTodo === -1) return false
                return true
    }

    return (
        <div className={`${props.allTodosLength ? "visible" : "invisible"} task-panel`}>
            <span className="task-panel__rest-items">{props.todosLength()} items left</span>
            <div className="task-panel__filters">
                {filters}
            </div>
            {!checkOneCompleted() ? (
                <button 
                    className={`task-panel__clear-btn hidden-btn`}
                    disabled
                >
                </button>
            ) : (
                <button
                    className={`task-panel__clear-btn`}
                    onClick={() => props.onCleanTodos()}
                >
                    Clear Completed
                </button>
            )}
        </div>
    )
}