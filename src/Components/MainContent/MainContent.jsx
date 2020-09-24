import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { TodoList } from '../TodoList/TodoList';
import { TaskPanel } from '../TaskPanel/TaskPanel';
import { TodoFormWrapper } from '../TodoFormWrapper/TodoFormWrapper';
import Api from '../../API/Api'

import './MainContent.css';
import 'react-toastify/dist/ReactToastify.css';


const notifyItem = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
}
  
export class MainContent extends Component {
    constructor() {
        super()
        this.state = {
            todos: [],
            filters: [
                { id: 1, value: 'All' },
                { id: 2, value: 'Active' },
                { id: 3, value: 'Complited' }
            ],
            filter: 'All',
            error: null
        }
    }

    componentDidMount() {
        Api.getTodos().then(res => {
            if (res.status === 200) {
                this.setState({todos: res.data})
            } else {
                this.setState({error: {text: `${res.message}`}})
            }
        })
    }


    notifyItem = (text) => toast.success(text, notifyItem);

    notifyWarning = (text) => toast.warning(text, notifyItem);

    notifyError = (text) => toast.error(text, notifyItem);

    changeFilter = (value) => {
        this.setState(() => ({ filter: value }))
    }

    getTodosDoneLength = () => {
        const cleanedTodos = this.state.todos.filter(todo => !todo.done)
        return cleanedTodos.length
    }

    addTask = (task) => {
        Api.addTodo(task).then(res => {
            if (res.status === 200) {
                this.setState((state) => ({ 
                    todos: [...state.todos, res.data]
                    })
                )
                this.notifyItem("New task added")
            } else {
                this.notifyError(res.message)
            }
        })
    }
    
    changeStatusTodo = (id, done) => {
        Api.changeStausTodo(id, done).then(res => {
            if (res.status === 200) {
                const markedTodos = this.state.todos.map(todo => {
                    if (todo._id === id) {
                        todo.done = !todo.done
                    }
                        return todo
                })
                this.setState(()=> ({ todos: markedTodos }))    
                done ? this.notifyWarning("Task undone") : this.notifyItem("Task done")
            } else {
                this.notifyError(res.message)
            }
        })
    }

    editTextTask = (id, text) => {
        Api.changeTextTodo(id, text).then(res => {
            if (res.status === 200) {
                const editedTodos = this.state.todos.map(todo => {
                    if (todo._id === id) {
                        todo.text = text
                    }
                        return todo
                })
                this.setState(() => ({ todos: editedTodos }))   
                this.notifyWarning(`Task Edited`)
            } else {
                this.notifyError(res.message)
            }
        })
    }

    checkAllDone = () => {
        const checkedTodos = this.state.todos.find(item => item.done === false)
        if (checkedTodos === undefined) {
            return true
        }
        return false
    }

    markAllTodos = (status) => {
        Api.changeStatusTodos(status).then(() => {
            status ? this.notifyItem("All task done") : this.notifyWarning(`All task undone`)
            this.setState(prevState => {
                const markedList = prevState.todos.map(todo => {
                    if (!todo.done) {
                        todo.done = status
                    } else if (todo.done) {
                        todo.done = status
                    }
                    return todo
                })
                return {
                    todos: markedList
                }
            })
        })
        .catch(err => {  
            this.notifyError(err.message)
        })
    }

    removeTodo = (id) => {
        const removedTodoList = this.state.todos.filter(item => item._id !== id)
        this.setState(() => ({ todos: removedTodoList }))

        Api.removeTodo(id).then(() => {
            this.notifyWarning(`Task removed`)
        })
        .catch(err => {  
            this.notifyError(err.message)
        })
    }

    cleanDoneTodos = () => {
        Api.removeTodos().then(() => {
            this.notifyWarning(`All done removed`)
            this.setState(prevState => {
                const cleanedTodos = prevState.todos.filter(todo => !todo.done)
                return {
                    todos: cleanedTodos
                }
            })
        })
        .catch(err => {  
            this.notifyError(err.message)
        })
    }

    render() {
        let filteredTodo = [];
          if (this.state.filter === "All") {
            filteredTodo = this.state.todos
        } else if (this.state.filter === "Active") {
            filteredTodo = this.state.todos.filter(todo => !todo.done)
        } else if (this.state.filter === "Complited") {
            filteredTodo = this.state.todos.filter(todo => todo.done)
        }

        if (this.state.error) {
            return (
                <h1>{ this.state.error.text }</h1>
            )   
        } 
        return (
            <div className={`main-content ${this.state.todos.length ? "box-shadow-active" : "box-shadow-off"}`}>
                <TodoFormWrapper
                    onAddTask={this.addTask}
                    checkTodos={this.checkAllDone}
                    onMarkAllTodos={this.markAllTodos}
                    todosLength={this.state.todos.length}
                />
                <TodoList
                    todosData={filteredTodo} 
                    onRemoveTodo={this.removeTodo} 
                    onChangeStatus={this.changeStatusTodo}
                    editText={this.editTextTask}
                />
                <TaskPanel
                    todosLength={this.getTodosDoneLength}
                    onCleanTodos={this.cleanDoneTodos}
                    filters={this.state.filters}
                    filterHandler={this.changeFilter}
                    filteredTodos={filteredTodo}
                    activeFilter={this.state.filter}
                    allTodosLength={this.state.todos.length}
                />
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        )
    }
}
