import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

class ViewEmployee extends Component 
{
    constructor(props) 
    {
        super(props);
        console.log(this.state);
        console.log(this.props);
        this.state = { 
            id : this.props.match.params.id,
            employee : {}
         }
    }

    componentDidMount() 
    {
        EmployeeService.getEmployeeByID(this.state.id).then((res) => 
        {
            this.setState({ employee: res.data});
        });
    }

    render() 
    {
        return (
            <div>
                <br/>
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center">View Employee Details</h3>
                    <div className="card-body">
                        <table>
                        <tr>
                            <td><label>Employee First Name </label></td>
                            <td> : </td>
                            <td> { this.state.employee.firstName } </td>
                        </tr>
                        <tr>
                            <td><label>Employee Last Name </label></td>
                            <td> : </td>
                            <td> { this.state.employee.lastName } </td>
                        </tr>
                        <tr >
                            <td><label>Employee Email ID </label></td>
                            <td> : </td>
                            <td> { this.state.employee.emailID } </td>
                        </tr>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

function ViewEmployeeComp(props) 
{
    let navigate = useNavigate();
    const match  = {params: useParams()};
    return <ViewEmployee {...props} navigate={navigate} match = {match} />
}

export default ViewEmployeeComp;