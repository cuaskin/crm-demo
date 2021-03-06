import React from 'react';

import './App.css';
import Navbar from './layout/Navbar';
import Employees from './Container/Employees';
import AddEmployee from './components/forms/AddEmployee';
import Test from './components/Test';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from './pages/NotFound';
import Contribute from "./pages/Contribute";
import Contact from "./pages/Contact";
import UpdateEmployee from './components/forms/UpdateEmployee';

function App() {
  return (<Router>
    <div className="container">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Employees} />
        <Route exact path="/addEmployee" component={AddEmployee} />
        <Route exact path="/test" component={Test} />
        <Route exact path="/github" component={Contribute}/>
        <Route exact path="/contact" component={Contact}/>
        <Route exact path="/edit/:id" component={UpdateEmployee}/>
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
  );
}

export default App;
