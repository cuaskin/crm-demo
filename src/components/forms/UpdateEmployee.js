import React, { Component } from 'react'
import UserConsumer from "../../context";
import axios from "axios";

class UpdateEmployee extends Component {
    state = {
        name: "",
        job: "",
        salary: 0,
        experience: "",
        error: false,
    }

    componentDidMount = async () => {
        const { id } = this.props.match.params;
        const response = await axios.get(`http://localhost:8080/users/${id}`);
        const { name, job, salary, experience } = response.data;

        this.setState({
            name,
            job,
            salary,
            experience
        })
    }


    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    updateEmployee = async (dispatch, e) => {
        e.preventDefault();

        const { name, job, salary, experience } = this.state;
        const { id } = this.props.match.params;
        const updateEmployee = {
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

        const response = await axios.put(`http://localhost:8080/users/${id}`, updateEmployee);
        console.log(response.data);

        dispatch({ type: "UPDATE_EMPLOYEE", payload: response.data });

        //redirect
        this.props.history.push("/");
    }

    validateForm = () => {
        const { name, job, salary, experience } = this.state;

        if (name === "" || job === ""  || salary === "" || experience === "") {
            return false;
        }
        return true
    }

    render() {
        const { name, job, salary, experience, error } = this.state;
        return (

            <UserConsumer>
                {
                    value => {
                        const { dispatch } = value;
                        return (

                            <div className="col-md-8 mb-4">
                                {
                                    error ? <div className="alert alert-danger">
                                        Lütfen Boş Alan Bırakmayınız!</div> : null
                                }
                                <div className="card" style={{ width: "18 rem" }}>
                                    <div className="card-header d-flex justif-content-between ">
                                        <h4 className="d-inline btn-block">Update Employee Form</h4>
                                    </div>

                                    <div className="card-body">
                                        <form onSubmit={this.updateEmployee.bind(this, dispatch)}>
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
                                            </div>wa
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
                                            <button className="btn btn-danger btn-block" type="submit">Update Employee</button>
                                        </form>

                                    </div>
                                </div>

                            </div>

                        )
                    }
                }
            </UserConsumer>
        )

    }
}

export default UpdateEmployee;
