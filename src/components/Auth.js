import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, withRouter } from 'react-router-dom';

import * as AuthActions from '../actions/auth';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';



class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drawerOpened: false
    }
  }

  handleButtonClick() {
    if (this.props.user.authenticated) {
      this.props.actions.signOutUser();
      this.props.history.push('/');
    }
    else {
      this.props.actions.signInUserWithTwitter()
    }
  }

  render() {
    return(
      <div>
        <AppBar
          title="Volt"
          iconElementRight={
            <FlatButton
              disabled={this.props.user.inProgress ? true : null}
              label={
                this.props.user.authenticated ?
                  'Sign out'
                  :
                  (this.props.user.inProgress ? 'Signing in' : 'Sign in with Twitter')
              }
            />
          }
          onRightIconButtonTouchTap={() => this.handleButtonClick()}
          onLeftIconButtonTouchTap={() => this.setState({drawerOpened: !this.state.drawerOpened})}
          onTitleTouchTap={() => this.props.history.push('/')}
        />

        <Drawer
          docked={false}
          width={220}
          open={this.state.drawerOpened}
          onRequestChange={(drawerState) => this.setState({drawerOpened: drawerState})}
        >
          <MenuItem onClick={() => this.props.history.push('/')}>Home</MenuItem>
          {
            this.props.user.authenticated ?
              <MenuItem
                onClick={() => {
                  this.props.history.push('/dashboard')
                  return this.setState({drawerOpened: false})
                }}
              >
                Dashboard
              </MenuItem>
              :
              null
          }
          <MenuItem onClick={() => window.open(`https://github.com/honmanyau/freecodecamp-voting-app`)}>GitHub Repository</MenuItem>
        </Drawer>

        {!this.props.user.inProgress && this.props.user.authenticated && this.props.user.redirect ? <Redirect to={this.props.user.redirectLocation} /> : null}
      </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));
