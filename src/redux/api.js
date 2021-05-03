import axios from "axios";

const baseUrl = 'http://localhost:14963/api/DbStudent/';

export default {
    Student(url = baseUrl){
        return {
            fetchAll: ()=> axios.get(url),
            create: (newStudent) => axios.post(url, newStudent),
            update: (id, editStudent) => axios.put(url+id, editStudent),
            delete: (id) => axios.delete(url+id)
        }
    }
}