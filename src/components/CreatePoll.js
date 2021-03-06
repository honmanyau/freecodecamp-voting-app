import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as PollActions from '../actions/poll';
import * as FetchActions from '../actions/fetch';

import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const initialState = {
  title: {
    text: '',
    error: null
  },
  pollOptions: {
    options: [
      "",
      ""
    ],
    error: null
  }
}

class CreatePoll extends Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({}, initialState);
  }


  addOption() {
    const newList = this.state.pollOptions.options.slice();

    newList.push("");

    this.setState({
      pollOptions: {
        options: newList,
        error: null
      }
    });
  }

  handleCreatePollButtonClick() {
    const arr = this.state.pollOptions.options;
    const filteredArr = arr.filter(item => item !== "");
    const testFilteredArr = Array.from(new Set(filteredArr));

    if (!this.state.title.text) {
      this.setState({
        title: {
          text: this.state.title.text,
          error: "Poll title must not be empty."
        }
      });
    }
    else if (filteredArr.length < 2) {
      this.setState({
        pollOptions: {
          options: this.state.pollOptions.options,
          error: 'A minimum of two options required.'
        }
      });
    }
    else if (filteredArr.length !== testFilteredArr.length) {
      this.setState({
        pollOptions: {
          options: this.state.pollOptions.options,
          error: 'Options must not be duplicated.'
        }
      });
    }
    else {
      const content = this.props.fetch.content;
      let tempPolls = {};
      const dummyPoll = {
        temp: {
          owner: this.props.user.data.displayName,
          ownerUid: this.props.user.data.uid,
          id: 'temp',
          title: 'Creating poll: ' + this.state.title.text
        }
      };

      if (!content) {
        tempPolls = dummyPoll;
      }
      else {
        tempPolls = Object.assign({}, content, dummyPoll);
      }

      this.props.actions.creatingPoll(tempPolls);

      this.props.actions.createPoll({
        owner: this.props.user.data.displayName,
        ownerUid: this.props.user.data.uid,
        created: new Date().getTime().toString(),
        title: this.state.title.text,
        options: filteredArr.map(option => {return {item: option}})
      });

      // For collapsing the expanded form, which is handled in ./Dashboard
      this.props.onSubmit();

      this.setState(Object.assign({}, initialState));
    }
  }

  render() {
    const options = this.state.pollOptions.options.map((pollOption, index) => {
      return (
        <TextField
          fullWidth
          key={index}
          type="text"
          value={this.state.pollOptions.options[index]}
          hintText={"Option"}
          errorText={this.state.pollOptions.error}
          floatingLabelText={index === 0 ? "Options:" : null}
          floatingLabelFixed={true}
          onChange={(event) => {
            const newList = this.state.pollOptions.options.slice();
            newList[index] = event.target.value;

            return this.setState({
              pollOptions: {
                options: newList,
                error: null
              }
            })
          }}
        />
      )
    });

    const styles = {
      width: '38%',
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center'
    }

    return(
      <Card>
        <CardText style={{textAlign: 'center'}}>
          <div style={styles}>
            <TextField
              fullWidth
              type="text"
              value={this.state.title.text}
              hintText="Poll Title"
              floatingLabelText="Title:"
              floatingLabelFixed={true}
              errorText={this.state.title.error}
              onChange={event => this.setState({
                  title: {
                    text: event.target.value,
                    error: null
                  }
                })
              }
            />

            {options}

            <br />

            <div style={{textAlign: 'center'}}>
              <FloatingActionButton
                mini
                backgroundColor="white"
                color="black"
              >
                <ContentAdd
                  style={{fill: "black"}}
                  onClick={() => this.addOption()}
                />
              </FloatingActionButton>
            </div>

            <br />

            <RaisedButton
              primary
              fullWidth
              label="Create Poll"
              onClick={() => this.handleCreatePollButtonClick()}
            />
          </div>
        </CardText>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    fetch: state.fetch
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Object.assign({}, PollActions, FetchActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePoll);
