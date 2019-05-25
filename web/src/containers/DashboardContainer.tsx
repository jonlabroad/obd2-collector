import React, { Dispatch } from "react";
import Dashboard from "../components/Dashboard";
import Obd2Reader from "../client/Obd2Reader";
import Credentials from "../aws/Credentials";
import HighchartsTheme from "../theme/HighchartsTheme";
import { PlotDashboardState, DataPlot } from "../types";
import { RootAction, updateDataset } from "../actions";
import { connect } from "react-redux";
import Dataset from "../data/Dataset";
import Datasets from "../data/Datasets";
import Enumerable from "linq";

export interface DashboardContainerProps {
    datasets: Datasets;
    selectedCalendarDate: string;
    plots: DataPlot[];

    updateDataset: any;
}

export class DashboardContainer extends React.Component<DashboardContainerProps> {
    constructor(props: DashboardContainerProps) {
        super(props);
    }
    
    async componentDidMount() {
        new Credentials().init();
        HighchartsTheme.applyTheme();
        this.updateData();
    }

    componentDidUpdate() {
        this.updateData();
    }

    updateData() {
        console.log(this.props);
        if (this.props.selectedCalendarDate &&
           (!this.props.datasets || this.props.selectedCalendarDate != this.props.datasets.calendarDate)) {
                new Obd2Reader().query(this.props.selectedCalendarDate).then((data: Dataset) => {
                    this.props.updateDataset(this.props.selectedCalendarDate, data);
                });
           }
    }

    render() {
        //this.updateData();
        console.log({dashboardContainerProps: this.props});
        return (
            <Dashboard
                datasets={this.props.datasets}
                plots={this.props.plots}
            />
        );
    }
}

export function mapStateToProps(state: PlotDashboardState) {
    return {
      datasets: state.datasets,
      plots: state.plots,
      selectedCalendarDate: state.calendarDate
    }
}

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
    updateDataset: (calDate: string, dataset: Dataset) => dispatch(updateDataset(calDate, dataset)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);