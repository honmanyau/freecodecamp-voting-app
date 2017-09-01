import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import * as FetchActions from '../actions/fetch';

import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import PollsCard from './PollsCard';
import CreatePoll from './CreatePoll';



class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    };
  }

  componentDidMount() {
    this.props.actions.fetchUserPolls(this.props.user.data.uid);
  }

  handleCreatePollSubmission() {
    this.setState({
      expanded: false
    })
  }

  render() {
    let polls = null;

    if (this.props.fetch.isFetching) {
      polls = 'Meows are fetching your polls for you!';
    }
    else if (this.props.fetch.content) {
      const content = this.props.fetch.content;

      polls = Object.keys(content).map(id => {
        const poll = content[id];

        return (
          <PollsCard key={poll.id} pollData={poll} />
        )
      })
    }
    else {
      polls = `You haven't created any polls.  Click the "New Poll" button above to create one.`
    }

    return(
      <div>
        <Card expanded={this.state.expanded}>
          <CardTitle
            title={`Hello, ${this.props.user.data.displayName}!`}
            subtitle={'Here you can edit the polls that you have created or create a new one by clicking on "NEW POLL".'}
          />

          <CardActions style={{padding: '8px 16px'}}>
            <RaisedButton
              primary
              label="New Poll"
              onClick={() => this.setState({expanded: !this.state.expanded})}
            />
          </CardActions>

          <CardText expandable>
            <CreatePoll create onSubmit={() => this.handleCreatePollSubmission()} />
          </CardText>

          <CardText>
            {polls}
          </CardText>
        </Card>
      </div>
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
    actions: bindActionCreators(FetchActions, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
