// import React from 'react'
// import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from "react-router-dom";

const Header = ({title, number,addTask, onFormToggle}) => {
    // let onClick = () => {
    //     alert("header click");
    // }
    const location = useLocation(); 
    return (
        <header className="header">
            <h1>{title} {number}</h1>
            {location.pathname === '/' && <Button color={addTask ? 'red' : 'green'} text={addTask ? 'Close' : 'Open Form'} onClick={onFormToggle}/> }
        </header>
    )
}

Header.defaultProps={
    title: 'Default'
}

// Header.PropTypes={
//     title: PropTypes.string,
//     number: PropTypes.number
// }
export default Header
