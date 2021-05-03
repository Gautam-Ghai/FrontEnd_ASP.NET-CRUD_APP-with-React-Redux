import React, { Component } from 'react';

//Redux
import {connect} from "react-redux";
import { create, update } from "../redux/actions/Student";

class InputForm extends Component {
    state = {
        prevId: -1,
        passwordType: "password",
        passwordError: "",
        coursesError: "",
        FirstName: "",
        LastName: "",
        UserName: "",
        Email: "",
        Password: "",
        Program: "Certificate",
        Gender: "",
        Courses: [],
    }

    showPassword = () =>{
        this.state.passwordType === "password" ? (this.setState({passwordType: "text"})) :  (this.setState({passwordType: "password"}))
    }

    handleChange = (event) =>{
        this.setState({ [event.target.name]: event.target.value})
    }

    handleInputChange = (event) =>{
        const target = event.target;
        var value = target.value;
        
        if(target.checked){
            this.state.Courses.push(value);
        }else{
            var x = this.state.Courses.indexOf(value);
            this.state.Courses.splice(x, 1);
        }
    }

    componentDidUpdate(){
        if(this.props.currentId !== 0 && this.props.currentId !== this.state.prevId){
            const obj = this.props.studentInfo.find(x => x.id === this.props.currentId)
            this.setState({
                FirstName: obj.firstName,
                LastName: obj.lastName,
                UserName: obj.userName,
                Email: obj.email,
                Password: obj.password,
                Program: obj.program,
                Gender: obj.gender,
                prevId: this.props.currentId,
        })
            this.check(obj.courses)
        }
    }

    check = (str) =>{
        var arr = str.split(',').sort();
        arr.map(x => document.getElementById(x).checked = true)
        this.setState({Courses: arr})
    }

    handleSubmit = (e) =>{
        const form =  new FormData(document.querySelector('#sectionForm'));
        var newStudent ={
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            userName: this.state.UserName,
            Email: this.state.Email,
            Password: this.state.Password,
            Program: this.state.Program,
            Gender: this.state.Gender,
            Courses: this.state.Courses.toString()
        }

        var str = newStudent.Password;

        if(str.match(/[a-z]/g) && 
        str.match(/[A-Z]/g) && 
        str.match(/[0-9]/g) && 
        str.match(/[^a-zA-Z\d]/g) && 
        str.length >= 8) {
            if(!form.has("Courses")){
                e.preventDefault();
                this.setState({coursesError: "Please select atleast one course!"})
            } else {
                if(this.props.currentId === 0){
                    this.props.create(newStudent, ()=> {window.alert('Inserted!')})
                    this.props.setId(0)
                } else {
                    this.props.update(this.props.currentId, newStudent, ()=> {window.alert('Updated!')})
                    this.props.setId(0)
                }
            }     
        } else{
            e.preventDefault();
            this.setState({passwordError: "Password must have a Uppercase, a Lowercase, a Number and minimum 8 character"})
        }
    }

    handleReset= () =>{
        this.setState({
            FirstName: "",
            LastName: "",
            UserName: "",
            Email: "",
            Password: "",
            Program: "Certificate",
            Gender: "",
            Courses: [],
            passwordType: "password",
        })
        this.props.setId(0)
    }
    
    render() { 
        return (
            <form onSubmit={this.handleSubmit} id="sectionForm">
                <div className="form-group">
                    <label>First Name:</label>
                    <input type="text" className="form-control" id="firstName" name="FirstName" required onChange={(event) => this.handleChange(event)} value={this.state.FirstName}/>
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input type="text" className="form-control" id="lastName" name="LastName" required onChange={(event) => this.handleChange(event)} value={this.state.LastName}/>
                </div>
                <div className="form-group">
                    <label>User Name:</label>
                    <input type="text" className="form-control" id="userName" name="UserName" required onChange={(event) => this.handleChange(event)} value={this.state.UserName}/>
                </div>
                <div className="form-group">
                    <label>Email address:</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="Email" required onChange={(event) => this.handleChange(event)} value={this.state.Email}/>
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <div className="input-group">
                        <input type={this.state.passwordType} className="form-control" id="password" name="Password" required onChange={(event) => this.handleChange(event)} aria-describedby="passwordHelpBlock" value={this.state.Password}/>
                        <div className="input-group-append">
                            <button type="button" className="input-group-button" onClick={this.showPassword}>{(this.state.passwordType === "password") ? 
                            (<span>Show</span>) : (<span>Hide</span>)}</button>
                        </div>
                    </div>
                    <small id="passwordHelpBlock" className="form-text text-muted">
                        {this.state.passwordError.length === 0 ? "" : this.state.passwordError}
                    </small>
                </div>
                <div >
                    <label className="col-form-label">Gender:</label>
                    <div className="form-check form-check-inline ml-3">
                        <input className="form-check-input" type="radio" name="Gender" id="male" value="Male" required checked={this.state.Gender === "Male"} onChange={(event) => this.handleChange(event)} />
                        <label className="form-check-label">Male</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="Gender" id="female" value="Female" checked={this.state.Gender === "Female"} onChange={(event) => this.handleChange(event)}/>
                        <label className="form-check-label">Female</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="Gender" id="other" value="Other" checked={this.state.Gender === "Other"} onChange={(event) => this.handleChange(event)}/>
                        <label className="form-check-label">Other</label>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Program:</label>
                    <div className="col-sm-10">
                        <select className="form-control" id="exampleFormControlSelect1" name="Program" onChange={(event) => this.handleChange(event)} value={this.state.Program}>
                            <option value="Certificate">Certificate</option>
                            <option value="Diploma">Diploma</option>
                            <option value="Degree">Degree</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="col-form-label">Courses:</label>
                        <div className="form-check form-check-inline ml-3">
                            <input className="form-check-input" type="checkbox" id="CIS" name="Courses" value="CIS" onChange={(event) => this.handleInputChange(event)}/>
                            <label className="form-check-label">CIS</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="COMP" name="Courses" value="COMP" onChange={(event) => this.handleInputChange(event)}/>
                            <label className="form-check-label">COMP</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="GD" name="Courses" value="GD" onChange={(event) => this.handleInputChange(event)}/>
                            <label className="form-check-label">GD</label>
                        </div>
                        <small className="form-text text-muted">
                            {this.state.coursesError.length === 0 ? "" : this.state.coursesError}
                        </small>
                        <br />
                </div>
                <button type="submit" className="btn btn-primary mr-2">Submit</button>
                <button type="reset" className="btn btn-secondary ml-2" onClick={this.handleReset}>Reset</button>
            </form>
        );
    }
}

const mapStateToProps = state => ({
    studentInfo: state.Student.Info
})

const mapActionToProps = {
    create: create,
    update: update
}
 
export default connect(mapStateToProps, mapActionToProps)(InputForm);