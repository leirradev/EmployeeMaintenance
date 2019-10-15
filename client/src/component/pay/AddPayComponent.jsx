import React, {Component} from "react";
import { Redirect } from 'react-router-dom';
class AddPayComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            balance:'',
            
            isBalanceNull:'',

            isBalanceInvalid:''
        };
        this.addPay = this.addPay.bind(this);
    }
    componentWillUnmount() {
        this.props.history.goForward();
    }
    addPay = (e) => {
        e.preventDefault();
        //API Calls
        alert('Pay Successfully Added');
        this.props.history.push('/view-employee');
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
                <h2>Add Pay</h2>
                <form>
                    <div className="form-group">
                        <label>Balance</label>
                        <input type="number" placeholder="Balance" name="balance" value={this.state.balance} id="balance" className={`form-control ${this.state.balance ? 'is-invalid' : ''}`} onBlur={this.validateBalance} onChange={this.handleBalanceChange} autoComplete="off"/>

                        <div className='invalid-feedback'>{this.state.isBalanceNull || this.state.isBalanceInvalid}</div>
                    </div>

                    <button onClick={this.addPay}>Add Pay</button>
                </form>
            </div>
        )
    }
}

export default AddPayComponent;