import React from 'react';
import Obd2Reader from '../client/Obd2Reader';
import Credentials from '../aws/Credentials';
import Dataset from '../data/Dataset';
import LinePlotContainer from '../containers/LinePlotContainer';

export interface DashboardProps {
  testdata: Dataset;
}

export default class Dashboard extends React.Component<DashboardProps> { 
  render() {
    return (
      <LinePlotContainer
        data={this.props.testdata}
      />
    );
  }
}
