import api from "../api"

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL'
}

export const fetchAll = () =>  dispatch =>{
    api.Student().fetchAll()
    .then(result =>{
        dispatch({
            type: ACTION_TYPES.FETCH_ALL,
            payload: result.data
        })
    })
    .catch(err =>{
        console.log(err)
    })
}

export const create = (newStduent, onSuccess) =>  dispatch =>{
    api.Student().create(newStduent)
    .then(result =>{
        dispatch({
            type: ACTION_TYPES.CREATE,
            payload: result.data
        })
        onSuccess();
    })
    .catch(err =>{
        console.log(err)
    })
}

export const update = (id, editStudent, onSuccess) =>  dispatch =>{
    api.Student().update(id, editStudent)
    .then(result =>{
        dispatch({
            type: ACTION_TYPES.UPDATE,
            payload: {id, ...editStudent}
        })
        onSuccess();
    })
    .catch(err =>{
        console.log(err)
    })
}

export const Delete = (id, onSuccess) =>  dispatch =>{
    api.Student().delete(id)
    .then(result =>{
        dispatch({
            type: ACTION_TYPES.DELETE,
            payload: id
        })
        onSuccess();
    })
    .catch(err =>{
        console.log(err)
    })
}
