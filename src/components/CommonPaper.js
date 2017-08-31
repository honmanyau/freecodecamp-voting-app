import React, { Component } from 'react';

import Paper from 'material-ui/Paper';



class CommonPaper extends Component {
  render() {
    const paperStyles = {
      padding: "15px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }

    return(
      <Paper style={paperStyles}>
        {this.props.children}
      </Paper>
    )
  }
}

export default CommonPaper;
