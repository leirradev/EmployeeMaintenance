import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',

            redirectToReferrer: false,

            isUsernameNull: '',
            isPasswordNull: '',

            isUserNameInvalid: '',
            isPasswordInvalid: ''
        };
        this.login = this.login.bind(this);
    }

    componentDidMount(){
        // localStorage.removeItem("apiToken");
        // sessionStorage.removeItem("apiToken");
    }

    login = (e) => {
        e.preventDefault();
        fetch('https://api.myjson.com/bins/kzguh')
            .then(res => res.json())
            .then(result => {
                if(result.username === this.state.username && result.password === this.state.password){
                    localStorage.setItem("apiToken", JSON.stringify(result));
                    this.setState({ redirectToReferrer: true });
                    this.props.history.push('/view-employee');
                }else {
                    alert("Invalid username or password.");
                }
            });
            
    }

    handleUsernameChange = (e) => this.setState({ username: e.target.value }, () => {
        this.validateUsername();
    });
    validateUsername = () => {
        const { username } = this.state;
        this.setState({
            isUsernameNull: username.trim().length !== 0 ? null : 'Username is required',
            isUserNameInvalid: username.length > 4 ? null : 'Username length should be atleast 5'
        });
    }

    handlePasswordChange = (e) => this.setState({ password: e.target.value }, () => {
        this.validatePassword();
    });
    validatePassword = () => {
        const { password } = this.state;
        this.setState({
            isPasswordNull: password.trim().length !== 0 ? null : 'Password is required',
            isPasswordInvalid: password.length > 4 ? null : 'Password length should be atleast 5'
        });
    }

    render() {
        if (localStorage.getItem('apiToken') != null) {
            return (<Redirect to={'/view-employee'} />)
        }
        return (
            <div>
                <h2>Login</h2>
                <form>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" placeholder="Username" name="username" id="username" onBlur={this.validateUsername} value={this.state.username} onChange={this.handleUsernameChange} autoComplete="off" />

                        <div className='invalid-feedback'>{this.state.isUsernameNull || this.state.isUserNameInvalid}</div>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Password" name="password" id="password" onBlur={this.validatePassword} value={this.state.password} onChange={this.handlePasswordChange} />

                        <div className='invalid-feedback'>{this.state.isPasswordNull || this.state.isPasswordInvalid}</div>
                    </div>

                    <button onClick={this.login}>Login</button>
                </form>
            </div>
        )
    }
}

export default withRouter(LoginComponent);