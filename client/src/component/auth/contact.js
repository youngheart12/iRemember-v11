import React,{Component} from 'react';
import './contact.css';
import {NavLink} from 'reactstrap';
class Contact extends Component {
    render(){
        return (<div>
            <NavLink href='#'>
          Contact us
        </NavLink>
        </div>);
    }
}
export default Contact;