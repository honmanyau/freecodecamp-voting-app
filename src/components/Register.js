import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import * as AuthActions from '../actions/auth';

import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import CommonPaper from './CommonPaper';



class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errorMessage: '',
      redirect: false
    };
  }

  register() {
    const authError = this.props.actions.authError;
    const registerUser = this.props.actions.registerUser;

    if (this.state.username.length < 1) {
      return authError('Please enter a username.');
    }

    // Password checking should be implemented server-side
    if (this.state.password === this.state.passwordConfirmation && this.state.username.length > 0) {
      return registerUser(this.state.email, this.state.password, this.state.username);
    }
    else {
      return authError('The passwords entered do not match.');
    }
  }

  render() {
    if (this.props.user.authenticated) {
      return <Redirect to="/" />
    }

    return(
      <CommonPaper>
        <TextField
          type="text"
          value={this.state.username}
          hintText="Username"
          onChange={(event) => this.setState({
            username: event.target.value
          })}
        />

        <TextField
          type="text"
          value={this.state.email}
          hintText="E-mail address"
          onChange={(event) => this.setState({
            email: event.target.value
          })}
        />

        <TextField
          type="password"
          value={this.state.password}
          hintText="Password"
          onChange={(event) => this.setState({
            password: event.target.value
          })}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              return this.register()
            }
          }}
        />

        <TextField
          type="password"
          value={this.state.passwordConfirmation}
          hintText="Confirm Password"
          onChange={(event) => this.setState({
            passwordConfirmation: event.target.value
          })}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              return this.register()
            }
          }}
        />

        <br />

        <div>
          <FlatButton
            primary
            label="Create Account"
            onClick={() => this.register()}
          />
        </div>

        <br />

        {this.props.user.error ? <div><br />{this.props.user.error}</div> : null}
      </CommonPaper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
