import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as muiColours from 'material-ui/styles/colors';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { Doughnut } from 'react-chartjs-2';

import PollsCardPublic from './PollsCardPublic';
import PollsCardPrivate from './PollsCardPrivate';



class PollsCard extends Component {
  colourPicker(index) {
    const colours = ["grey", "cyan", "indigo", "pink", "brown", "deepOrange", "amber", "green"];
    const shade = 500 - 200 * (Math.floor(index / colours.length) % 3);

    return muiColours[colours[index % colours.length] + shade];
  }

  render() {
    const poll = this.props.pollData;
    const chartData = {
      datasets: [{
        data: poll.options.map((option) => option.votes),
        backgroundColor: poll.options.map((option, index) => this.colourPicker(index))
      }],
      labels: poll.options.map((option) => option.item)
    };

    return(
      <Card>
        <CardHeader
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
                  <PollsCardPrivate pollData={this.props.pollData} />
                  :
                  <PollsCardPublic pollData={this.props.pollData} />
              }
            </div>

            <div style={{width: "62%"}}>
              <Doughnut
                data={chartData}
              />
            </div>
          </div>
        </CardText>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps, null)(PollsCard));
