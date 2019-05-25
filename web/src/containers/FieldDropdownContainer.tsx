import React, { Dispatch } from "react";
import { Select, MenuItem } from "@material-ui/core";
import { PlotDashboardState, DataPlot } from "../types";
import { RootAction, updatePlotSelection } from "../actions";
import { connect } from "react-redux";
import Enumerable from "linq";
import Datasets from "../data/Datasets";
import Dataset from "../data/Dataset";

export interface FieldDropdownContainerProps {
    plotIndex: number;
    
    plots: DataPlot[];
    datasets: Datasets;

    updatePlotSelection: any;
}

export class FieldDropdownContainer extends React.Component<FieldDropdownContainerProps> {
    onChange(event: any) {
        this.props.updatePlotSelection("main", event.target.value, this.props.plotIndex);
    }
    
    getFieldOptions(): string[] {
        if (!this.props.datasets) {
            return [];
        }
        var dataset: Dataset = Enumerable.from(this.props.datasets.data).firstOrDefault().value;
        return Object.keys(dataset.data);
    }

    getSelection() {
        var plot = this.props.plots[this.props.plotIndex];
        if (plot) {
            var series = Enumerable.from(plot.series).firstOrDefault();
            return series.yName;
        }
    }
    
    renderItems(): Array<JSX.Element> {
        if (!this.props.datasets || !this.props.datasets.data) {
            return [];
        }
        return Enumerable.from(this.props.datasets.data["main"].data).select((dataset) => {
            return (
                <MenuItem value={dataset.key}>{dataset.key}</MenuItem>
            )
        }).toArray();
    }

    render() {
        console.log({render: this.props.plots});
        return (
            <Select
                value={this.getSelection()}
                onChange={this.onChange.bind(this)}
                inputProps={{
                    name: 'Field',
                    id: `plot-field-${this.props.plotIndex}`,
                }}
            >
                {this.renderItems()}
            </Select>
        )
    }
}

export function mapStateToProps(state: PlotDashboardState) {
    return {
      plots: state.plots,
      datasets: state.datasets
    }
}

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
    updatePlotSelection: (plotKey: string, selectedField: string, plotIndex: number) => dispatch(updatePlotSelection(plotKey, selectedField, plotIndex)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FieldDropdownContainer);