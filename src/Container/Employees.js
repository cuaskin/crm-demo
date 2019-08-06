import React, { Component } from 'react'
import UserConsumer from "../context";
import Employee from '../components/Employee';
import Title from '../components/Title';
import SearchBar from '../components/SearchBar';

export default class Employees extends Component {

    render() {
        return (          
            <UserConsumer>
                {
                    value => {
                        console.log("value", value)
                        const { users } = value;
                        return (

                            <div>
                                <Title title={"Employee İnformation"}/>
                                <SearchBar/>
                                {
                                    users.map((user) =>
                                        <Employee
                                            key={user.id}
                                            id={user.id}
                                            name={user.name}
                                            job={user.job}
                                            salary={user.salary}
                                            experience={user.experience}
                                        />
                                    )
                                }
                            </div>
                        )
                    }
                }
            </UserConsumer>
        )
    }
}
