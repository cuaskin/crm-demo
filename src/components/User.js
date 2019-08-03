import React from "react";
import PropTypes from "prop-types";
import UserConsumer from "../context";
import axios from "axios";
import { Link } from "react-router-dom";

class User extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
        }
    }

    onClickEvent = (e) => {
        this.setState({ isVisible: !this.state.isVisible })
    }

    onDeleteUser = async (dispatch, e) => {
        const { id } = this.props;
        //delete request
        await axios.delete(`http://localhost:8080/users/${id}`);

        //Consumer dispatch
        dispatch({ type: "DELETE_EMPLOYEE", payload: id })
    }

    componentWillUnmount() {
        console.log("Component Will Unmount");
    }

    render() {
        //Destructing
        const { id, name, job, salary, experience } = this.props;
        const { isVisible } = this.state;

        return (
            <UserConsumer>
                {
                    value => {
                        const { dispatch } = value;

                        return (
                            <div className="col-md-8 mb-4" >
                                <div className="card" style={isVisible ? { backgroundColor: "#63B8FF", color: "white" } : null}>
                                    <div className="card-header justify-content-between d-flex" onClick={this.onClickEvent}>
                                        <h4 className="d-inline">{name}</h4>
                                        <i className="far fa-trash-alt" style={{ cursor: "pointer" }} onClick={this.onDeleteUser.bind(this, dispatch)} />
                                    </div>
                                    {
                                        isVisible ?
                                            <div className="card-body">
                                                <p className="card-text">Job: {job}</p>
                                                <p className="card-text">Salary: {salary}</p>
                                                <p className="card-text">Experience:{experience}</p>
                                                <Link to={`/edit/${id}`} className="btn btn-dark btn-block">Update Employee</Link>
                                            </div> : null
                                    }
                                </div>
                            </div>
                        )
                    }
                }
            </UserConsumer>
        )
    }
}

User.propTypes = {
    name: PropTypes.string.isRequired,
    job: PropTypes.string.isRequired,
    experience: PropTypes.string.isRequired,
    salary: PropTypes.number.isRequired
}

User.defaultProps = {
    name: "null",
    job: "null",
    experience: "null",
    salary: null
}

export default User;
