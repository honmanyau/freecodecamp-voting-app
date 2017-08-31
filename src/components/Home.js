import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as FetchActions from '../actions/fetch';

import { Card, CardTitle, CardText } from 'material-ui/Card';
import PollsCard from './PollsCard';



class Home extends React.Component {
  componentDidMount() {
    this.props.actions.fetchLatestPolls();
  }

  render() {
    let polls = null;

    if (this.props.fetch.isFetching) {
      polls = "Meows fetching polls for you!";
    }
    else if (this.props.fetch.content) {
      polls = this.props.fetch.content.map(poll => {
        return (
          <PollsCard key={poll.id} pollData={poll} />
        )
      })
    }

    return(
      <Card>
        <CardTitle
          title="Latest Polls"
        />
        <CardText>
          {polls}
        </CardText>
      </Card>
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
    actions: bindActionCreators(FetchActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
