import React, {Component} from "react";
import { Redirect } from 'react-router-dom';
class EditEmployeeComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            firstName:'',
            lastName:'',
            dateOfBirth:'',
            contactNumber:'',
            email:'',
            balance:'',
            
            isFirstNameNull:'',
            isLastNameNull:'',
            isDateOfBirthNull:'',
            isContactNumberNull:'',
            isEmailNull:'',
            isBalanceNull:'',
            
            isFirstNameInvalid:'',
            isLastNameInvalid:'',
            isContactNumberInvalid:'',
            isEmailInvalid:'',
            isBalanceInvalid:''
        };
        this.updateEmployee = this.updateEmployee.bind(this);
        this.loadEmployee = this.loadEmployee.bind(this);
    }
    componentWillUnmount() {
        this.props.history.goForward();
    }
    componentDidMount(){
        this.loadEmployee();
    }

    loadEmployee(){
        //API Calls
    }

    updateEmployee = (e) => {
        e.preventDefault();
        //API Calls
        alert('Employee Successfully Updated');
        this.props.history.push('/view-employee');
    }

    handleFirstNameChange = (e) => 
    {
        const regex = /^[a-zA-Z\b]+$/;
        if(regex.test(e.target.value) || e.target.value === '')
            this.setState({firstName:e.target.value}, () => {
                this.validateFirstName();
            });
    }
    validateFirstName = () => {
        const {firstName} = this.state;
        this.setState({
            isFirstNameNull: firstName.length !== 0 ? null : 'First Name is required',
            isFirstNameInvalid: firstName.length >=3 ? null : 'First Name length should be 3 characters above'
        });
    }

    handleLastNameChange = (e) => 
    {
        const regex = /^[a-zA-Z\b]+$/;
        if(regex.test(e.target.value) || e.target.value === '')
            this.setState({lastName:e.target.value}, () => {
                this.validateLastName();
        });
    }
    validateLastName = () => {
        const {lastName} = this.state;
        this.setState({
            isLastNameNull: lastName.length !== 0 ? null : 'Last Name is required',
            isLastNameInvalid: lastName.length >=3 ? null : 'Last Name length should be 3 characters above'
        });
    }

    handleDateOfBirthChange = (e) => this.setState({dateOfBirth:e.target.value}, () => {
        this.validateDateOfBirth();
    });
    validateDateOfBirth = () => {
        
    }

    handleContactNumberChange = (e) => 
    {
        const regex = /^[0-9\b]+$/;
        if(regex.test(e.target.value) || e.target.value === '')
             this.setState({contactNumber:e.target.value}, () => {
                this.validateContactNumber();
            });
    }
    validateContactNumber = () => {
        const {contactNumber} = this.state;
        this.setState({
            isContactNumberNull: contactNumber.length !== 0 ? null : 'Contact Number is required',
            isContactNumberInvalid: contactNumber.length === 11 ? null : 'Contact Number should be 11-digit'
        });
    }

    handleEmailChange = (e) => 
    {
        this.setState({email:e.target.value}, () => {
            this.validateEmail();
        });
    }
    validateEmail = () => {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const {email} = this.state;
        this.setState({
            isEmailNull: email.trim().length !== 0 ? null : 'Email is required',
            isEmailInvalid: regex.test(email) ? null : 'Invalid Email'
        });
    }

    handleBalanceChange = (e) => this.setState({balance:e.target.value}, () => {
        this.validateBalance();
    });
    validateBalance = () => {
        const {balance} = this.state;
        this.setState({
            isBalanceNull: balance.trim().length !== 0 ? null : 'Balance is required',
            isBalanceInvalid: balance >=0 && balance <=100000 ? null: 'Balance should be 0-100,000 only'
        });
    }

    render() {
        if (localStorage.getItem('apiToken') == null) {
            return (<Redirect to={'/'} />)
        }
        return(
            <div>
                <h2>Edit Employee</h2>
                <form>
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" placeholder="First Name" name="firstName" id="firstName" className={`form-control ${this.state.isFirstNameNull ? 'is-invalid' : ''}`} onBlur={this.validateFirstName}
                        value={this.state.firstName} onChange={this.handleFirstNameChange} autoComplete="off"/>
                        
                        <div className='invalid-feedback'>{this.state.isFirstNameNull || this.state.isFirstNameInvalid}</div>
                    </div>

                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" placeholder="Last Name" name="lastName" value={this.state.lastName} id="lastName" className={`form-control ${this.state.isLastNameNull ? 'is-invalid' : ''}`} onBlur={this.validateLastName} onChange={this.handleLastNameChange} autoComplete="off"/>

                        <div className='invalid-feedback'>{this.state.isLastNameNull || this.state.isLastNameInvalid}</div>
                    </div>

                    <div className="form-group">
                        <label>Date of Birth</label>
                        <input type="date" name="dateOfBirth" value={this.state.dateOfBirth} onChange={this.handleDateOfBirthChange}/>
                    </div>

                    <div className="form-group">
                        <label>Contact Number</label>
                        <input type="text" placeholder="Contact Number" name="contactNumber" value={this.state.contactNumber} id="contactNumber" className={`form-control ${this.state.isContactNumberNull ? 'is-invalid' : ''}`} onBlur={this.validateContactNumber} onChange={this.handleContactNumberChange} autoComplete="off" minLength={11} maxLength={11}/>

                        <div className='invalid-feedback'>{this.state.isContactNumberNull || this.state.isContactNumberInvalid}</div>
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="Email" name="email" value={this.state.email} id="email" className={`form-control ${this.state.isEmailNull ? 'is-invalid' : ''}`} onBlur={this.validateEmail} onChange={this.handleEmailChange} autoComplete="off"/>

                        <div className='invalid-feedback'>{this.state.isEmailNull || this.state.isEmailInvalid}</div>
                    </div>

                    <div className="form-group">
                        <label>Balance</label>
                        <input type="number" placeholder="Balance" name="balance" value={this.state.balance} id="balance" className={`form-control ${this.state.balance ? 'is-invalid' : ''}`} onBlur={this.validateBalance} onChange={this.handleBalanceChange} autoComplete="off"/>

                        <div className='invalid-feedback'>{this.state.isBalanceNull || this.state.isBalanceInvalid}</div>
                    </div>

                    <button onClick={this.updateEmployee}>Update</button>
                </form>
            </div>
        )
    }
}

export default EditEmployeeComponent;