import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';



class PrivateRoute extends Component {
  render() {
    const {component: SuppliedComponent, ...rest} = this.props;

    if (!this.props.user.inProgress) {
      return(
        <Route
          {...rest}
            render={routeProps => {
              if (this.props.user.authenticated) {
                return <SuppliedComponent {...routeProps} />
              }
              else {
                return <Redirect to="/" />
              }
            }
          }
        />
      )
    }
    else {
      return <div></div>
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(PrivateRoute);
