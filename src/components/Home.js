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
    let polls = [];
    let featuredPolls = [];

    if (this.props.fetch.content) {
      const content = this.props.fetch.content;
      const pollList = Object.keys(content).map(id => {
        return content[id];
      });

      polls = pollList.map(poll => {
        if (poll.featured) {
          featuredPolls.push(<PollsCard key={poll.id} pollData={poll} featured />);
        }

        return (
          <PollsCard key={poll.id} pollData={poll} />
        )
      }).reverse();
    }

    return(
      <Card>
        <CardTitle
          title="Featured Polls"
        />
        <CardText>
          {this.props.fetch.isFetching ? "Meows fetching polls for you!" : featuredPolls}
        </CardText>
        <CardTitle
          title="Latest Polls"
        />
        <CardText>
          {this.props.fetch.isFetching ? "Meows fetching polls for you!" : polls}
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
