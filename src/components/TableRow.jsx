import React from 'react';

const TableRow = (props) => {
    const{ info: {id, firstName,email, lastName, userName,gender, program, courses} } = props;
    const onDelete =(id) =>{
        props.handleDelete(id)
    }

    const onEdit =(id) =>{
        props.setId(id)
    }
    return (
        <tr>
            <td>{firstName} {lastName}</td>
            <td>{email}</td>
            <td>{userName}</td>
            <td>{gender}</td>
            <td>{program}</td>
            <td>{courses}</td>
            <td>
            <div className="btn-group" role="group" aria-label="Basic example">
                <button className="btn btn-primary" onClick={() => onEdit(id)}>Edit</button>
                <button className="btn btn-danger" onClick={() => onDelete(id)}>Delete</button>
                </div>
            </td>
        </tr>
    );
}
 
export default TableRow;