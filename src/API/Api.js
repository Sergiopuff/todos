import axios from "axios";

class API {
    location = '/api/todos'

    async getTodos(){
		const result = await axios.get(this.location)
		    .catch((e) => e)
        return result
    }

    async addTodo(task){
		const result = await axios.post(this.location, { text: task, done: false })
		    .catch((e) => e)
        return result
    }

    async changeStausTodo(id, done){
		const result = await axios.put(`${this.location}/${id}`, { done: !done })
		    .catch((e) => e)
        return result
    }

    async changeTextTodo(id, text){
		const result = await axios.put(`${this.location}/${id}`, { text: text })
		    .catch((e) => e)
        return result
    }

    async changeStatusTodos(status){
		const result = await axios.put(this.location, {done: status})
		    .catch((e) => e)
        return result
    }

    async removeTodo(id){
		const result = await axios.delete(`${this.location}/${id}`)
		    .catch((e) => e)
        return result
    }

    async removeTodos(){
		const result = await axios.delete(this.location)
		    .catch((e) => e)
        return result
    }
 
}


export default new API()


 