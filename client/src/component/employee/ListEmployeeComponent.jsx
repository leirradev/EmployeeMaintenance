import React, { Component } from "react";
import ReactTable from "react-table";
import { Input } from "semantic-ui-react";
import "react-table/react-table.css";
import { Redirect } from 'react-router-dom';

const originalData = [
    {
        id: 1,
        firstName: 'john',
        lastName: 'doe',
        dateOfBirth: '26/04/1996',
        contactNumber: '09151234567',
        email: 'lester@gmail.com',
        balance: '1000'
    },
    {
        id: 2,
        firstName: 'aira',
        lastName: 'doe',
        dateOfBirth: '12/04/1986',
        contactNumber: '09151234567',
        email: 'lester@gmail.com',
        balance: '1000'
    },
    {
        id: 3,
        firstName: 'babe',
        lastName: 'wick',
        dateOfBirth: '04/01/1990',
        contactNumber: '09151234567',
        email: 'lester@gmail.com',
        balance: '1000'
    },
    {
        id: 4,
        firstName: 'nika',
        lastName: 'sexy',
        dateOfBirth: '04/01/1990',
        contactNumber: '09151234567',
        email: 'lester@gmail.com',
        balance: '1000'
    }
];

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: originalData,
            columns: [],
            searchInput: "",
            redirectToReferrer: false,
        };
        this.loadEmployeeList = this.loadEmployeeList.bind(this);
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.logout = this.logout.bind(this);
    }
    logout(){
        localStorage.removeItem("apiToken");
        sessionStorage.removeItem("apiToken");
        this.setState({ redirectToReferrer: true });
        this.props.history.push("/");
    }
    componentWillUnmount() {
        this.props.history.goForward();
    }
    componentDidMount() {
        this.loadEmployeeList();

        let columns = [
            {
                Header: "Id",
                accessor: "id",
                sortable: false,
                show: false,
                displayValue: " Id"
            },
            {
                Header: "First Name",
                accessor: "firstName",
                sortable: true,
                show: true,
                displayValue: " First Name"
            },
            {
                Header: "Last Name",
                accessor: "lastName",
                sortable: false,
                show: true,
                displayValue: " Last Name"
            },
            {
                Header: "Date Of Birth",
                accessor: "dateOfBirth",
                sortable: false,
                show: true,
                displayValue: "Date Of Birth "
            },
            {
                Header: "Contact Number",
                accessor: "contactNumber",
                sortable: false,
                show: true,
                displayValue: " Contact Number "
            },
            {
                Header: "Email",
                accessor: "email",
                sortable: false,
                show: true,
                displayValue: " Email "
            },
            {
                Header: "Balance",
                accessor: "balance",
                sortable: false,
                show: true,
                displayValue: " Balance "
            },
            {
                Cell: ({value}) => (<button onClick={this.editEmployee}>Edit</button>),
                width: 60
            },
            {
                Cell: ({value2}) => (<button onClick={this.viewPay}>View Pay</button>),
                width: 90
            },
            {
                Cell: ({value3}) => (<button onClick={this.addPay}>Add Pay</button>),
                width: 80
            },
            {
                Cell: ({value4}) => (<button  onClick={(e) => { if (window.confirm('Are you sure you wish to delete?')) this.deleteEmployee(e)}}>Delete</button>),
                width: 80
            }
        ];
        this.setState({ columns });
    }

    loadEmployeeList() {
        //API Calls
    }

    handleSearchChange = e => {
        this.setState({ searchInput: e.target.value }, () =>{
            this.globalSearch();
        });
    }

    globalSearch = () => {
        let { searchInput } = this.state;
        let filteredData = originalData.filter(value => {
            return value.firstName.toLowerCase().trim().includes(searchInput);
        });
        this.setState({ data: filteredData });
    };

    addEmployee() {
        this.props.history.push('/add-employee');
    }

    editEmployee = () => {
        this.props.history.push('/edit-employee');
    }

    deleteEmployee = () => {

    }

    addPay = () => {
        this.props.history.push('/add-pay');
    }

    viewPay = () => {
        this.props.history.push('/view-pay');
    }

    render() {
        if (localStorage.getItem('apiToken') == null) {
            return (<Redirect to={'/'} />)
        }
        let { data, columns, searchInput } = this.state;

        return (
            <div>
                <button onClick={() => this.addEmployee()}>Add Employee</button>
                <Input
                    size="large"
                    placeholder="Search By First Name"
                    name="searchInput"
                    value={searchInput || ""}
                    onChange={this.handleSearchChange}
                    label="Search"
                />
                <br />
                <ReactTable
                    data={data}
                    columns={columns}
                    defaultPageSize={8}
                    className="-striped -highlight"
                    pivotColumnWidth={1}
                />
                <button onClick={this.logout}>Log Out</button>
            </div>
        );
    }
}

export default ListEmployeeComponent;