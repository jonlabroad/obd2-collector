import { Reducer } from 'redux';
import { PlotDashboardState } from '../types';
import { UPDATE_DATASET, UPDATE_PLOT_SELECTION, UPDATE_DATE } from '../constants';
import Datasets from '../data/Datasets';

const initialState: PlotDashboardState = {
    datasets: {calendarDate: '', data: {}},
    plots: [{
      series: [{
        xName: "timestamp",
        yName: "SPEED_kph"
      }]
    }],
    calendarDate: "20190512"
};

export const updateData: Reducer<PlotDashboardState> = (state = initialState, action): PlotDashboardState => {
  if (!state) {
    state = initialState;
  }
  switch (action.type) {
    case UPDATE_DATASET:
      var newDatasets = JSON.parse(JSON.stringify(state.datasets)) as Datasets;
      newDatasets.data["main"] = action.dataset;
      newDatasets.calendarDate = action.calendarDate;
      return { ...state, datasets: newDatasets };
    case UPDATE_PLOT_SELECTION:
      var newState = { ...state };
      newState.plots = JSON.parse(JSON.stringify(newState.plots));
      newState.plots[action.plotIndex].series = JSON.parse(JSON.stringify(newState.plots[action.plotIndex].series));
      newState.plots[action.plotIndex].series[0].yName = action.fieldSelection;
      return newState;
    case UPDATE_DATE:
      console.log(action.calendarDate);
      return { ...state, calendarDate: action.calendarDate };
    default:
      console.log(`Don't know how to process ${action.type}`)
  }
  return state;
}