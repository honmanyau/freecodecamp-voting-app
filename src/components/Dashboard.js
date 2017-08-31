import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as FetchActions from '../actions/fetch';

import { Card, CardTitle, CardText } from 'material-ui/Card';

import PollsCard from './PollsCard';
import CreatePoll from './CreatePoll';



class Dashboard extends Component {
  componentDidMount() {
    this.props.actions.fetchUserPolls(this.props.user.data.uid);
  }

  render() {
    let polls = null;

    if (this.props.fetch.isFetching) {
      polls = 'Meows are fetching your polls for you!';
    }
    else if (this.props.fetch.content) {
      polls = this.props.fetch.content.map(poll => {
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
        <CreatePoll create />

        <Card>
          <CardTitle
            title={`Hello, ${this.props.user.data.displayName}! These are your polls:`}
          />

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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
