import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import * as FetchActions from '../actions/fetch';

import * as muiColours from 'material-ui/styles/colors';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { Doughnut } from 'react-chartjs-2';

import PollsCardPublic from './PollsCardPublic';
import PollsCardPrivate from './PollsCardPrivate';



class SinglePoll extends Component {
  componentDidMount() {
    this.props.actions.fetchSinglePoll(this.props.match.params.id);
  }

  colourPicker(index) {
    const colours = ["grey", "cyan", "indigo", "pink", "brown", "deepOrange", "amber", "green"];
    const shade = 500 - 200 * (Math.floor(index / colours.length) % 3);

    return muiColours[colours[index % colours.length] + shade];
  }

  render() {
    let poll = {};
    let chartData = {};

    if (this.props.fetch.singlePoll) {
      poll = this.props.fetch.singlePoll;
      chartData = {
        datasets: [{
          data: poll.options.map((option) => option.votes),
          backgroundColor: poll.options.map((option, index) => this.colourPicker(index))
        }],
        labels: poll.options.map((option) => option.item)
      };
    }

    return(
      <Card>
        {
          this.props.fetch.singlePoll ?
            (
              <div>
                <CardTitle
                  title={poll.title}
                  subtitle={"Created by " + poll.owner}
                  actAsExpander={true}
                  showExpandableButton={true}
                />

                <CardText expandable={true}>
                  <div style={{display: "flex"}}>
                    <div style={{width: "38%"}}>
                      {
                        this.props.user.authenticated && this.props.location.pathname === '/dashboard' ?
                          <PollsCardPrivate pollData={poll} />
                          :
                          <PollsCardPublic pollData={poll} />
                      }
                    </div>

                    <div style={{width: "62%"}}>
                      <Doughnut
                        data={chartData}
                      />
                    </div>
                  </div>
                </CardText>
              </div>
            )
            :
            <CardText>Meows fetching polls for you!</CardText>
        }
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
    actions: bindActionCreators(FetchActions, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SinglePoll));
