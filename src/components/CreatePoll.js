import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as PollActions from '../actions/poll';

import { Card, CardActions, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const initialState = {
  expanded: false,
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
    const testArr = Array.from(new Set(arr));

    if (!this.state.title.text) {
      this.setState({
        title: {
          text: this.state.title.text,
          error: "Poll title must not be empty."
        }
      });
    }
    else if (arr.filter(item => item !== "").length < 2) {
      this.setState({
        pollOptions: {
          options: this.state.pollOptions.options,
          error: 'A minimum of two options required.'
        }
      });
    }
    else if (arr.length !== testArr.length) {
      this.setState({
        pollOptions: {
          options: this.state.pollOptions.options,
          error: 'Options must not be duplicated.'
        }
      });
    }
    else {
      this.props.actions.createPoll({
        owner: this.props.user.data.displayName,
        ownerUid: this.props.user.data.uid,
        created: new Date().getTime().toString(),
        title: this.state.title.text,
        options: this.state.pollOptions.options.map(option => {return {item: option}})
      });

      this.setState(Object.assign({}, initialState, {expanded: true}));
    }
  }

  render() {
    const options = this.state.pollOptions.options.map((pollOption, index) => {
      return (
        <div key={index}>
          <TextField
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
        </div>
      )
    });

    return(
      <Card expanded={this.state.expanded}>
        <CardActions>
          Clear fields after submitting, perhaps redirect.
          <RaisedButton
            label="New Poll"
            onClick={() => this.setState({expanded: !this.state.expanded})}
          />
        </CardActions>
        <CardText expandable={true}>
          <div style={{width: '38%'}}>
            <TextField
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
    poll: state.poll
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(PollActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePoll);
