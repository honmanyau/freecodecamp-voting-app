import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as PollActions from '../actions/poll';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';



const initialState = {
  value: 0,
  delete: false,
  title: {
    text: '',
    error: null
  },
  pollOptions: {
    options: [
      ""
    ],
    error: null
  }
};

class PollsCardPrivate extends Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({}, initialState);
  }

  componentDidMount() {
    this.setState({
      title: {
        text: this.props.pollData.title,
        error: null
      }
    });

    //this.props.pollData.options.map(option => option.item)
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

  handleEditPollButtonClick() {
    const arr = this.state.pollOptions.options;
    const oldArr = this.props.pollData.options.map(option => option.item);
    const testArr = Array.from(new Set([...arr, ...oldArr]));

    if (!this.state.title.text) {
      this.setState({
        title: {
          text: this.state.title.text,
          error: "Poll title must not be empty."
        }
      });
    }
    else if (arr.length + oldArr.length !== testArr.length) {
      this.setState({
        pollOptions: {
          options: this.state.pollOptions.options,
          error: 'Options must not be duplicated.'
        }
      });
    }
    else {
      this.props.actions.editPoll({
        id: this.props.pollData.id,
        owner: this.props.pollData.owner,
        ownerUid: this.props.pollData.ownerUid,
        created: this.props.pollData.created,
        title: this.state.title.text,
        options: arr.filter(item => item.length > 0).length > 0 ?
          this.state.pollOptions.options.map(option => {return {item: option}})
          :
          null
      });

      this.setState(Object.assign({}, initialState, {
        title: {
          text: this.state.title.text,
          error: null
        }
      }))
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
            floatingLabelText={index === 0 ? "Add Options:" : null}
            floatingLabelFixed={true}
            errorText={this.state.pollOptions.error}
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

    const containerStyles = {
      display: "flex",
      flexDirection: "column"
    }

    return(
      <div style={containerStyles}>
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
          label="Edit Poll"
          onClick={() => this.handleEditPollButtonClick()}
        />

        <br />

        {
          this.state.delete ?
            <RaisedButton
              secondary
              label="Confirm Delete"
              onClick={() => this.props.actions.deletePoll(this.props.pollData)}
            />
            :
            <RaisedButton
              label="Delete Poll"
              onClick={() => this.setState({delete: true})}
            />
        }
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(PollActions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(PollsCardPrivate);
