import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <header >

            <ul>
                
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/addEmployee">Add Employee</Link>
                </li>
                <li>
                    <Link to="/test">Test</Link>
                </li>
                <li>
                    <Link to="/github">Project Files</Link>
                </li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>
        </header>
    )
}

export default Navbar;
