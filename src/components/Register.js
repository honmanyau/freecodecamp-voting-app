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
      username: {
        text: '',
        error: null
      },
      email: {
        text: '',
        error: null
      },
      password: {
        text: '',
        error: null
      },
      passwordConfirmation: {
        text: ''
      },
      errorMessage: '',
      redirect: false
    };
  }

  register() {
    const registerUser = this.props.actions.registerUser;

    if (this.state.username.text < 1) {
      const newUsernameState = Object.assign({}, this.state.username, {
        error: 'Please enter a username.'
      });

      this.setState({username: newUsernameState});
    }

    if (!this.state.email.text.match(/.+@.*?\..+/)) {
      const newEmailState = Object.assign({}, this.state.email, {
        error: 'The e-mail is badly formatted.'
      });

      this.setState({email: newEmailState});
    }

    if (this.state.password.text.length === 0) {
      const newPasswordState = Object.assign({}, this.state.password, {
        error: 'Please enter a password.'
      });

      this.setState({password: newPasswordState});
    }
    else if (this.state.password.text.length < 6) {
      const newPasswordState = Object.assign({}, this.state.password, {
        error: 'The password must contain at least 6 characters.'
      });

      this.setState({password: newPasswordState});
    }

    if (this.state.password.text !== this.state.passwordConfirmation.text) {
      const newPasswordState = Object.assign({}, this.state.password, {
        error: 'The passwords entered do not match.'
      });

      this.setState({password: newPasswordState});
    }

    if (this.state.password.text === this.state.passwordConfirmation.text && this.state.username.text.length > 0) {
      return registerUser(this.state.email.text, this.state.password.text, this.state.username.text);
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
          value={this.state.username.text}
          hintText="Username"
          errorText={this.state.username.error}
          onChange={(event) => this.setState({
            username: {
              text: event.target.value,
              error: null
            }
          })}
        />

        <TextField
          type="text"
          value={this.state.email.text}
          hintText="E-mail address"
          errorText={this.state.email.error}
          onChange={(event) => this.setState({
            email: {
              text: event.target.value,
              error: null
            }
          })}
        />

        <TextField
          type="password"
          value={this.state.password.text}
          hintText="Password"
          errorText={this.state.password.error}
          onChange={(event) => this.setState({
            password: {
              text: event.target.value,
              error: null
            }
          })}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              return this.register()
            }
          }}
        />

        <TextField
          type="password"
          value={this.state.passwordConfirmation.text}
          hintText="Confirm Password"
          errorText={this.state.password.error}
          onChange={(event) => this.setState({
            passwordConfirmation: {
              text: event.target.value,
              error: null
            }
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
