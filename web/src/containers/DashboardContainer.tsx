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
    
        new Obd2Reader().query("20190512").then((data: Dataset) => {
            this.props.updateDataset(data);
        });
    }

    render() {
        console.log({dashboardContainerState: this.props.datasets});
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
      plots: state.plots
    }
}

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
    updateDataset: (dataset: Dataset) => dispatch(updateDataset(dataset)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);