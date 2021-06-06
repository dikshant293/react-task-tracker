const Button = (props) => {
    const cssObj = {
        backgroundColor: props.color
    }
    
    return <button onClick={props.onClick} className="btn" style={cssObj}>{props.text}</button>
}

Button.defaultProps = {
    color:'steelblue',
    text: 'btn'
}

export default Button
