import React from 'react';
import Dataset from '../data/Dataset';
import LinePlotContainer from '../containers/LinePlotContainer';
import Helmet from 'react-helmet';
import Grid from '@material-ui/core/Grid';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

export interface DashboardProps {
  testdata: Dataset;
}

export default class Dashboard extends React.Component<DashboardProps> { 
  render() {
    return (
      <div>
        <Helmet>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
        </Helmet>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="primary">
              OBD-II Zone
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <LinePlotContainer
              data={this.props.testdata}
              fieldName='SPEED_kph'
            />
          </Grid>
          <Grid item xs={12}>
            <LinePlotContainer
              data={this.props.testdata}
              fieldName='RPM_revolutions_per_minute'
            />
          </Grid>
          <Grid item xs={12}>
            <LinePlotContainer
              data={this.props.testdata}
              fieldName='ABSOLUTE_LOAD_percent'
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}
