import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as PollActions from '../actions/poll';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';



class PollsCardPublic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      delete: false
    }
  }

  render() {
    const dropDownItems = this.props.pollData.options.map((option, index) => {
      return (
        <MenuItem
          key={index}
          value={index}
          primaryText={option.item}
        />
      )
    });

    const containerStyles = {
      display: "flex",
      flexDirection: "column"
    }

    return(
      <div style={containerStyles}>
        <DropDownMenu
          maxHeight={200}
          value={this.state.value}
          onChange={(event, index, value) => this.setState({value})}
        >
          {dropDownItems}
        </DropDownMenu>

        <br />

        <RaisedButton
          primary
          label="Submit Vote"
          onClick={() => this.props.actions.submitVote(this.props.pollData.id, this.state.value)}
        />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(PollActions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(PollsCardPublic);
