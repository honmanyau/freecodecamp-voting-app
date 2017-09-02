import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as PollActions from '../actions/poll';
import * as FetchActions from '../actions/fetch';

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

  handleSubmitVoteButtonClick() {
    const polls = Object.assign({}, this.props.fetch.content);
    const newPolls = Object.keys(polls).map(key => {
      const poll = polls[key];

      if (polls[key].id === this.props.pollData.id) {
        poll.options[this.state.value].votes += 1;
      }

      return poll;
    });
    
    this.props.actions.submittingVote(newPolls);
    this.props.actions.submitVote(this.props.pollData.id, this.state.value);
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
          onClick={() => this.handleSubmitVoteButtonClick()}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetch: state.fetch
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Object.assign({}, PollActions, FetchActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PollsCardPublic);
