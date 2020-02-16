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


class LoginModal extends Component {
  state = {
    modal: false,
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
    // Clear errors
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

    const { email, password } = this.state;

    const user = {
      email,
      password
    };

    // Attempt to login
    this.setState({
      showSpinner:true
    })
    this.props.login(user);
  };

  render() {
  
    return (
      <div>
       
        <NavLink onClick={this.toggle} href='#'>
          Login
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
          {this.state.msg ? (
              <Alert color='danger'>{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
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
                {this.state.msg?"Try again":this.state.showSpinner?<Spinner color="primary"></Spinner>:"Login"} 
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
  error:state.auth.err
});
const mapDispatchToProps=(dispatch)=>{
  return {
    login:(loginDetails)=>{dispatch(actionCreator.login(loginDetails))},
    clearErrors:()=>{dispatch(actionCreator.clearErrors())}
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(LoginModal);