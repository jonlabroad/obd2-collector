import React from "react";
import Dataset from "../data/Dataset";
import * as Enumerable from 'linq';
import "../styles/dashboard.css";
import HighchartsReact from 'highcharts-react-official';
import Highcharts, { Options, ChartOptions } from 'highcharts';

export interface LinePlotContainerProps {
    data: Dataset;
    fieldName: string;
}

export interface LinePlotContainerState {

}

export default class LinePlotContainer extends React.Component<LinePlotContainerProps, LinePlotContainerState> {

    createOptions(): any {
        return {
            title: this.props.fieldName,
            xAxis: {
            },
            yAxis: {
                title: this.props.fieldName
            },
            series: [
                {
                    data: this.createSeries(),
                    turboThreshold: 0
                }
            ],
            plotOptions: {
              series: {
                point: {
                  events: {
                    //mouseOver: this.setHoverData.bind(this)
                  }
                }
              }
            }
        }
    }

    createSeries(): any[] {
        return Enumerable.from(this.props.data.data[this.props.fieldName]).select((element) => {
            var d = new Date(0);
            d.setUTCSeconds(element.timestamp);
            return {x: d, y: element.value};
        }).toArray();
    }

    render() {
        if (!this.props.data) {
            return <div>LOADING</div>;
        }

        return (
            <div className='lineplot-container'>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={this.createOptions()}
                />

            </div>
        );
    }

}