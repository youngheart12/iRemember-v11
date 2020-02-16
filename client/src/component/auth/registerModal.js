import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
  Spinner
} from 'reactstrap';
import { connect } from 'react-redux';
import * as actionCreator from '../../actions/authAction';


class RegisterModal extends Component {
  state = {
    modal: false,
    name: '',
    email: '',
    password: '',
    msg: null,
    showSpinner:false
  };

 

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
    this.setState({msg:error.msg});
    }
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }


  toggle = () => {
     this.props.clearErrors();
    this.setState({
      modal: !this.state.modal,
      showSpinner:false
    });
  };



  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };



  onSubmit = e => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const newUser = {
      name,
      email,
      password
    };
    this.setState({
      showSpinner:true
    })
    this.props.registerUser(newUser);
  };

  render() {
 
    return (
      <div>
        <NavLink onClick={this.toggle} href='#'>
          Register
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color='danger'>{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='name'>Name</Label>
                <Input
                  type='text'
                  name='name'
                  id='name'
                  placeholder='Name'
                  className='mb-3'
                  onChange={this.onChange}
                />

                <Label for='email'>Email</Label>
                <Input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Email'
                  className='mb-3'
                  onChange={this.onChange}
                />

                <Label for='password'>Password</Label>
                <Input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Password'
                  className='mb-3'
                  onChange={this.onChange}
                />
                <Button color='dark' style={{ marginTop: '2rem' }} block>
                 {this.state.msg?"Try again":this.state.showSpinner?<Spinner color="primary"></Spinner>:"Register"} 
                </Button>
             
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.err
});


const mapDispatchToProps=(dispatch)=>{
  return{
    registerUser:(newUser)=>dispatch(actionCreator.register(newUser)),
    clearErrors:()=>dispatch(actionCreator.clearErrors())
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(RegisterModal);