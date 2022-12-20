import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

class UpdateEmployee extends Component 
{
    constructor(props) 
    {
        super(props);
        console.log(this.props);
        this.state = { 
            id : this.props.match.params.id,
            firstName : '',
            lastName : '',
            emailID : ''
         }
         this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
         this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
         this.updateEmployee = this.updateEmployee.bind(this);
         this.cancel = this.cancel.bind(this);
    }

    componentDidMount() 
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

    updateEmployee = (e) =>
    {
        e.preventDefault();
        let employee = { firstName: this.state.firstName, lastName: this.state.lastName, emailID: this.state.emailID };
        console.log('employee => ' + JSON.stringify(employee));

        EmployeeService.updateEmployee(employee, this.state.id).then(res => 
            {
                this.props.navigate('/employees');
            })
    }

    cancel = () =>
    {
        this.props.navigate('/employees');
    }

    render() 
    {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3">
                            <h3 className="text-center">Update Employee</h3>
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
                                    <button className='btn btn-success' onClick={this.updateEmployee}>Save</button>
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

function UpdateEmployeeComp(props) 
{
    let navigate = useNavigate();
    //let { id } = useParams();
    //let params = useParams();
    const match  = {params: useParams()};
    return <UpdateEmployee {...props} navigate={navigate} match = {match}/*params={params}*/ />
}

export default UpdateEmployeeComp;