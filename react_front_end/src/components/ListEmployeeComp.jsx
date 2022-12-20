import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

class ListEmployee extends Component 
{
    constructor(props) 
    {
        super(props);
        console.log(this.state);
        console.log(this.props);
        this.state = { employees: [] }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    componentDidMount() 
    {
        EmployeeService.getEmployees().then((res) => 
        {
            this.setState({ employees: res.data});
        });
    }
    
    addEmployee()
    {
        this.props.navigate('/add-employee/_add');
    }
    
    editEmployee(id)
    {
        this.props.navigate(`/add-employee/${id}`); //back quotes
    }

    deleteEmployee(id)
    {
        EmployeeService.deleteEmployee(id).then((res) => 
        {
            this.setState({ employees: this.state.employees.filter(employee => employee.id !== id) });
        });
    }

    viewEmployee(id)
    {
        this.props.navigate(`/view-employee/${id}`); //back quotes
    }

    render() 
    {
        return (
            <div>
                <h2 className="text-center">Employees List</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addEmployee}>Add Employee</button>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Employee First Name</th>
                                <th>Employee Last Name</th>
                                <th>Employee Email ID</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(
                                    employee =>
                                    <tr key={employee.id}>
                                        <td>{employee.firstName}</td>
                                        <td>{employee.lastName}</td>
                                        <td>{employee.emailID}</td>
                                        <td>
                                            <button onClick={ () => this.editEmployee(employee.id) } className="btn btn-info">Update</button>
                                            <button onClick={ () => this.deleteEmployee(employee.id) } className="btn btn-danger" style={{marginLeft:"10px"}}>Delete</button>
                                            <button onClick={ () => this.viewEmployee(employee.id) } className="btn btn-info" style={{marginLeft:"10px"}}>View</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

function ListEmployeeComp(props) 
{
    let navigate = useNavigate();
    return <ListEmployee {...props} navigate={navigate} />
}

export default ListEmployeeComp;