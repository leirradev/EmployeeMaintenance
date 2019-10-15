import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import ListEmployeeComponent from "../employee/ListEmployeeComponent";
import AddEmployeeComponent from "../employee/AddEmployeeComponent";
import EditEmployeeComponent from "../employee/EditEmployeeComponent";
import AddPayComponent from "../pay/AddPayComponent";
import ViewPayComponent from "../pay/ViewPayComponent";
import LoginComponent from '../login/LoginComponent';

const AppRouter = () => {
    return(
        <div>
            <Router>
                <div className = "col-md-6">
                    <Switch>
                        <Route>
                            <Route path="/view-employee" exact component={ListEmployeeComponent}/>
                            <Route path="/add-employee" exact component={AddEmployeeComponent}/>
                            <Route path="/edit-employee" exact component={EditEmployeeComponent}/>
                            <Route path="/add-pay" exact component={AddPayComponent}/>
                            <Route path="/view-pay" exact component={ViewPayComponent}/>
                            <Route path="/"   exact component={LoginComponent}/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default AppRouter;