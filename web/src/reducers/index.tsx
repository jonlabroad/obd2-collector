import { Reducer } from 'redux';
import { PlotDashboardState } from '../types';
import Datasets from '../data/Datasets';
import { UPDATE_DATASET, UPDATE_PLOT_SELECTION } from '../constants';

const initialState: PlotDashboardState = {
    datasets: {},
    plots: [{
      series: [{
        xName: "timestamp",
        yName: "SPEED_kph"
      }]
    }]
};

export const updateData: Reducer<PlotDashboardState> = (state = initialState, action): PlotDashboardState => {
  if (!state) {
    state = initialState;
  }
  switch (action.type) {
    case UPDATE_DATASET:
      var newDatasets = JSON.parse(JSON.stringify(state.datasets));
      newDatasets["main"] = action.dataset;
      return { ...state, datasets: newDatasets };
    case UPDATE_PLOT_SELECTION:
      var newState = { ...state };
      newState.plots = JSON.parse(JSON.stringify(newState.plots));
      newState.plots[action.plotIndex].series = JSON.parse(JSON.stringify(newState.plots[action.plotIndex].series));
      newState.plots[action.plotIndex].series[0].yName = action.fieldSelection;
      return newState;
      
    default:
      console.log(`Don't know how to process ${action.type}`)
  }
  return state;
}