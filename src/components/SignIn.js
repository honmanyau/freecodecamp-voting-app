import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import * as AuthActions from '../actions/auth';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import CommonPaper from './CommonPaper';



class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      email: '',
      password: '',
      errorMessage: ''
    };
  }

  signIn() {
    this.props.actions.signInUser(this.state.email, this.state.password);
  }

  signInWithTwitter() {
    this.props.actions.signInUserWithTwitter();
  }

  render() {
    return(
      <CommonPaper>
        <TextField
          type="text"
          value={this.state.email}
          hintText="E-mail address"
          onChange={(event) => this.setState({
            email: event.target.value
          })}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              return this.signIn()
            }
          }}
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
              return this.signIn()
            }
          }}
        />

        <br />

        <div>
          <RaisedButton
            primary
            label="Sign in"
            onClick={() => this.signIn()}
          />
        </div>

        <br />

        <div>
          <RaisedButton
            primary
            label="Sign in with Twitter"
            onClick={() => this.signInWithTwitter()}
          />
        </div>

        <br />
        <br />

        {this.props.user.error ? <div>{this.props.user.error}<br /><br /></div> : null}

        {this.props.user.authenticated ? <Redirect to="/dashboard" /> : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
