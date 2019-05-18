import { Reducer } from 'redux';
import { PlotDashboardState } from '../types';
import Datasets from '../data/Datasets';

const initialState: PlotDashboardState = {
    datasets: {}
};

export const updateData: Reducer<PlotDashboardState> = (state = initialState, action): PlotDashboardState => {
  if (!state) {
    state = initialState;
  }
  switch (action.type) {

    default:
      console.log(`Don't know how to process ${action.type}`)
  }
  return state;
}