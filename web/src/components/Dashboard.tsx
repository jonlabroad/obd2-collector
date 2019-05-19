import React from 'react';
import Dataset from '../data/Dataset';
import LinePlotContainer from '../containers/LinePlotContainer';
import Helmet from 'react-helmet';
import Grid from '@material-ui/core/Grid';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import Datasets from '../data/Datasets';
import Enumerable from 'linq';
import { DataPlot } from '../types';
import FieldDropdownContainer from '../containers/FieldDropdownContainer';

export interface DashboardProps {
  datasets: Datasets;
  plots: DataPlot[];
}

export default class Dashboard extends React.Component<DashboardProps> { 
  renderPlots(dataset: Dataset): Array<JSX.Element | null> {
    return Enumerable.from(this.props.plots).select((plot) => {
      var firstSeries = Enumerable.from(plot.series).firstOrDefault();
      if (!firstSeries) {
        return null;
      }
      return (
        <Grid item xs={12}>
          <FieldDropdownContainer
            plotIndex={0}
          />
          <LinePlotContainer
            data={dataset}
            fieldName={firstSeries.yName}
          />
        </Grid>
      );
    })
    .toArray();
  }
  
  render() {
    var datasetEntry = Enumerable.from(this.props.datasets).firstOrDefault();
    console.log({datasetEntry: datasetEntry});
    var dataset = datasetEntry ? datasetEntry.value : undefined;
    if (!dataset) {
      return null;
    }
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
          {this.renderPlots(dataset)}
        </Grid>
      </div>
    );
  }
}
