import React from 'react';
import './Header.css'
import {Link} from 'react-router-dom';

const Header = () => {
    return(
        <header id="header">
            <div id="logo_main">
                <Link to="/"><h1 id="headingListing">E!</h1></Link>
                <Link to="/viewOrder">Orders</Link>
            </div>
            <div className="logoRight">
                <Link className="btn btn-danger" to="/register"><span className="glyphicon glyphicon-user"></span> SignUp </Link> &nbsp;
                <Link className="btn btn-warning" to="/login"><span className="glyphicon glyphicon-log-in"></span> Login </Link>
            </div>
        </header>    
    )
}

export default Header;