import React from "react";
import Dashboard from "../components/Dashboard";
import Obd2Reader from "../client/Obd2Reader";
import Credentials from "../aws/Credentials";
import HighchartsTheme from "../theme/HighchartsTheme";

export interface DashboardContainerProps {
    
}

export default class DashboardContainer extends React.Component<DashboardContainerProps, {data: any}> {
    constructor(props: DashboardContainerProps) {
        super(props);
        this.state = {
            data: undefined
        }
    }
    
    async componentDidMount() {
        new Credentials().init();
        HighchartsTheme.applyTheme();
    
        new Obd2Reader().query("20190512").then((data) => {
            this.setState({
                ...this.state,
                data: data
            });
            console.log(data);
        });
    }

    render() {
        return (
            <Dashboard
                testdata={this.state.data}
            />
        );
    }
}