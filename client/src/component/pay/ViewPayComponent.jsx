import React, {Component} from "react";
import { Redirect } from 'react-router-dom';
class ViewPayComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            pay:[]
        };
        this.loadPayList = this.loadPayList.bind(this);
    }
    componentWillUnmount() {
        this.props.history.goForward();
    }
    componentDidMount(){
        this.loadPayList();
    }
    
    loadPayList(){
        //API Calls
    }

    
    render() {
        if (localStorage.getItem('apiToken') == null) {
            return (<Redirect to={'/'} />)
        }
        return(
            <div>
                <h2>View Pay History</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="hidden">Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Balance Added</th>
                        </tr>

                        <tbody>
                        { 
                            this.state.pay.map(pay => 
                            <tr key={pay.id}>
                                <td>{pay.firstName}</td>
                                <td>{pay.lastName}</td>
                                <td>{pay.balance}</td>
                            </tr>
                        )
                        }
                    </tbody>
                    </thead>
                </table>
            </div>
        )
    }
}

export default ViewPayComponent;