import React from "react";
import { VictoryChart, VictoryLine } from 'victory';
import Dataset from "../data/Dataset";
import * as Enumerable from 'linq';
import "../styles/dashboard.css";

export interface LinePlotContainerProps {
    data: Dataset;
}

export interface LinePlotContainerState {

}

export default class LinePlotContainer extends React.Component<LinePlotContainerProps, LinePlotContainerState> {

    render() {
        if (!this.props.data) {
            return <div>LOADING</div>;
        }

        var data = Enumerable.from(this.props.data.data['SPEED_kph']).select((element) => {
            var d = new Date(0);
            d.setUTCSeconds(element.timestamp);
            return {x: d, y: element.value};
        }).toArray();

        return (
            <div className='lineplot-container'>
                <VictoryChart>
                    <VictoryLine
                        data={data}
                    />
                </VictoryChart>
            </div>
        );
    }

}