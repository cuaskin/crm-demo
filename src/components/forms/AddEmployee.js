import React, { Component } from 'react'
import posed from 'react-pose';
import UserConsumer from "../../context";
import axios from "axios";
import Title from '../Title';

//var uniqid = require('uniqid');

const Animation = posed.div({
    visible: {
        opacity: 1,
        applyAtStart: {
            display: "block"
        }
    },
    hidden: {
        opacity: 0,
        applyAtEnd: {
            display: "none"
        }
    }
});

class AddEmployee extends Component {
    state = {
        isVisible: false,
        name: "",
        job: "",
        salary: 0,
        experience: "",
        error: false,
    }

    changeVisibilityFrom = (e) => {
        this.setState({ isVisible: !this.state.isVisible })
    }

    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addEmployee = async (dispatch, e) => {
        e.preventDefault();

        const { name, job, salary, experience } = this.state;
        const newEmployee = {
            //id: uniqid(),
            name,
            job,
            salary: parseInt(salary),
            experience
        }

        if (!this.validateForm()) {
            this.setState({
                error: true
            })
            return;
        }

        this.setState({
            name: "",
            job: "",
            salary: 0,
            experience: "",
            error: false
        })

        const response = await axios.post("http://localhost:8080/users", newEmployee);
        dispatch({ type: "ADD_EMPLOYEE", payload: response.data });

        //Redirect
        this.props.history.push("/");
    }

    validateForm = () => {
        const { name, job, salary, experience } = this.state;

        if (name === "" || job === "" || salary === "" || experience === "") {
            return false;
        }
        return true;
    }

    render() {
        const { isVisible, name, job, salary, experience, error } = this.state;
        return (

            <UserConsumer>
                {
                    value => {
                        const { dispatch } = value;
                        return (

                            <div className="col-md-8 mb-4">
                                <Title title={"Create Employee"} />
                                {
                                    error ? <div className="alert  alert-danger" role="alert">Lütfen Boş Alan Bırakmayınız!</div> : null
                                }
                                <div className="card" style={{ width: "18 rem" }}>
                                    <div className="card-header d-flex justif-content-between ">
                                        <h4 className="d-inline btn-block">Add Employee Form</h4>
                                        <i
                                            className={isVisible ? "fas fa-chevron-circle-down" : "fas fa-chevron-circle-up"}
                                            style={{ cursor: "pointer" }}
                                            onClick={this.changeVisibilityFrom} />
                                    </div>
                                    <Animation pose={isVisible ? 'visible' : 'hidden'}>
                                        <div className="card-body">
                                            <form onSubmit={this.addEmployee.bind(this, dispatch)}>
                                                <div className="form-group">
                                                    <label htmlFor="name">Name</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        id="id"
                                                        placeholder="Enter Name"
                                                        className="form-control"
                                                        value={name}
                                                        onChange={this.changeInput}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="job">Job</label>
                                                    <input
                                                        type="text"
                                                        name="job"
                                                        id="job"
                                                        placeholder="Enter Job"
                                                        className="form-control"
                                                        value={job}
                                                        onChange={this.changeInput}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="salary">Salary</label>
                                                    <input
                                                        type="number"
                                                        name="salary"
                                                        id="salary"
                                                        placeholder="Enter Salary"
                                                        className="form-control"
                                                        value={salary}
                                                        onChange={this.changeInput}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="experience">Experience</label>
                                                    <input
                                                        type="text"
                                                        name="experience"
                                                        id="experience"
                                                        placeholder="Enter Experience"
                                                        className="form-control"
                                                        value={experience}
                                                        onChange={this.changeInput}
                                                    />
                                                </div>
                                                <button className="btn btn-danger btn-block" type="submit">Add New Personal</button>
                                            </form>

                                        </div>
                                    </Animation>
                                </div>
                            </div>
                        )
                    }
                }
            </UserConsumer>
        )
    }
}

export default AddEmployee;
