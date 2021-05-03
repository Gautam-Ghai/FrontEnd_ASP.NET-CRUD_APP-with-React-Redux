import React, { Component } from 'react';
import InputForm from './InputForm';
import ReadForm from './ReadForm';

//Redux
import {connect} from "react-redux";
import { fetchAll, Delete } from "../redux/actions/Student";

class Home extends Component {
    state = {
      currentId: 0
    }
    componentDidMount(){
        this.props.fetchAllStudents()
    }

    handleDelete = (id) =>{
      this.props.delete(id)
    }

    setId = (id) =>{
      this.setState({currentId: id})
    }

    render() {  
        return (
            <div className="container">
            <div className="jumbotron text-center">
              <h1>Welcome to ASP.NET CRUD app with React and Redux!</h1>
            </div>
            <div className="row">
              <div className="col-lg-4 mb-3">
                <InputForm currentId={this.state.currentId} setId={this.setId} result={this.props.studentInfo}/>
              </div>
              <div className="col-lg-8">
                <ReadForm result={this.props.studentInfo} handleDelete={this.handleDelete} setId={this.setId}/>
              </div>
            </div>
          </div>
        );
    }
}

const mapStateToProps = state => ({
    studentInfo: state.Student.Info
})

const mapActionToProps = {
    fetchAllStudents: fetchAll,
    delete: Delete
}
 
 
export default connect(mapStateToProps, mapActionToProps)(Home);