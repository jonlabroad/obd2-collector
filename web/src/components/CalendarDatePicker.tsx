import React, { Dispatch } from "react";
import { TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { PlotDashboardState } from "../types";
import { RootAction, updateDate } from "../actions";

export interface CalendarDatePickerProps {
    calendarDate: string;

    updateDate: any;
}

export interface CalendarDatePickerState {
    fieldValue: string;
}

export class CalendarDatePicker extends React.Component<CalendarDatePickerProps, CalendarDatePickerState> {
    constructor(props: CalendarDatePickerProps) {
        super(props);
        this.state = {
            fieldValue: ""
        };
    }
    
    fieldValueChanged(event: any) {
        this.setState({
            ...this.state,
            fieldValue: event.target.value
        });
    }

    onBlur() {
        this.props.updateDate(this.state.fieldValue);
    }

    render() {
        return (
            <div className="date-picker-container">
                <TextField
                    value={this.state.fieldValue}
                    onChange={this.fieldValueChanged.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                />
            </div>
        );
    }
}

export function mapStateToProps(state: PlotDashboardState) {
    return {
      calendarDate: state.calendarDate
    }
}

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
    updateDate: (date: string) => dispatch(updateDate(date)),
});


export default connect(mapStateToProps, mapDispatchToProps)(CalendarDatePicker);