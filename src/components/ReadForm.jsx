import React from 'react';
import TableRow from './TableRow';

const ReadForm = (props) => {
    const { result } = props;
    return (  
        <div className="table-responsive">
            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Full Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Program</th>
                        <th scope="col">Courses</th>
                        <th scope="col">Utils</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map(info => <TableRow key={info.id} info={info} handleDelete={props.handleDelete} setId={props.setId}/>)}
                </tbody>
            </table>
        </div>
    );
}
 
export default ReadForm;