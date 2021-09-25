import PropTypes from "prop-types"
import Button from "./Button"
import {useLocation} from 'react-router-dom'

// pass data props dari komponen header
const Header = ({title, onAdd, showAdd}) => { 

    const location = useLocation()
    // parsing data props onClick
   
    return (
        <header className='header'>
            <h1 >{title}</h1>
           {location.pathname==='/'&&
           <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd} />}
        </header>
    )
}

// objek untuk mengisi props
Header.defaultProps = {
    title:'Task Tracker',
  }

//tipe props  
Header.propTypes = {
    title: PropTypes.string.isRequired,
}

// css dynamic di js
// const HeadingStyle ={
//     color: 'red', 
//     backgroundColor: 'black'
// }

export default Header
