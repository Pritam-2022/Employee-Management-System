import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

class CreateEmployee extends Component
{
    constructor(props) 
    {
        super(props);
        this.state = { 
            id : this.props.match.params.id,
            firstName : '',
            lastName : '',
            emailID : ''
         }
         this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
         this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
         this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
         this.cancel = this.cancel.bind(this);
    }

    componentDidMount() 
    {
        if(this.state.id === '_add')
        {
            return;
        }
        else
        {
            EmployeeService.getEmployeeByID(this.state.id).then((res) => 
            {
                this.setState({ 
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    emailID: res.data.emailID
                });
            });
        }
    }

    changeFirstNameHandler = (event) =>
    {
        this.setState({ firstName : event.target.value });
    }

    changeLastNameHandler = (event) =>
    {
        this.setState({ lastName : event.target.value });
    }

    changeEmailHandler = (event) =>
    {
        this.setState({ emailID : event.target.value });
    }

    saveOrUpdateEmployee = (e) =>
    {
        e.preventDefault();
        let employee = { 
            firstName: this.state.firstName, 
            lastName: this.state.lastName, 
            emailID: this.state.emailID 
        };
        console.log('employee => ' + JSON.stringify(employee));

        if(this.state.id === '_add')
        {
            EmployeeService.createEmployee(employee).then(res => 
                {
                    this.props.navigate('/employees');
                });
        }
        else
        {
            EmployeeService.updateEmployee(employee, this.state.id).then(res => 
                {
                    this.props.navigate('/employees');
                })
        }

    }

    cancel = () =>
    {
        this.props.navigate('/employees');
    }

    getTitle()
    {
        if(this.state.id === '_add')
        {
            return <h3 className="text-center">Add Employee</h3>
        }
        else
        {
            return <h3 className="text-center">Update Employee</h3>
        }
    }

    render() 
    {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3">
                            {this.getTitle()}
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>First Name: </label>
                                        <input 
                                        placeholder="First Name"
                                        name="firstName"
                                        className="form-control"
                                        value={this.state.firstName}
                                        onChange={this.changeFirstNameHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name: </label>
                                        <input 
                                        placeholder="Last Name"
                                        name="lastName"
                                        className="form-control"
                                        value={this.state.lastName}
                                        onChange={this.changeLastNameHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email Address: </label>
                                        <input 
                                        placeholder="Email Address"
                                        name="emailID"
                                        className="form-control"
                                        value={this.state.emailID}
                                        onChange={this.changeEmailHandler}
                                        />
                                    </div>
                                    <button className='btn btn-success' onClick={this.saveOrUpdateEmployee}>Save</button>
                                    <button className='btn btn-danger' onClick={this.cancel} style={{marginLeft:"10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function CreateEmployeeComp(props) 
{
    let navigate = useNavigate();
    const match  = {params: useParams()};
    return <CreateEmployee {...props} navigate={navigate} match = {match} />
}

export default CreateEmployeeComp;