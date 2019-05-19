import * as constants from '../constants';
import Dataset from '../data/Dataset';

export interface UpdateDataset {
    type: constants.UPDATE_DATASET;
    dataset: Dataset;
}
export type UpdateDatasetAction = UpdateDataset;
export function updateDataset(dataset: Dataset): UpdateDataset {
    return {
        type: constants.UPDATE_DATASET,
        dataset: dataset,
    }
};

export interface UpdatePlotSelection {
    type: constants.UPDATE_PLOT_SELECTION;
    plotKey: string,
    fieldSelection: string,
    plotIndex: number
}
export type UpdatePlotSelectionAction = UpdatePlotSelection;
export function updatePlotSelection(plotKey: string, fieldSelection: string, plotIndex: number): UpdatePlotSelection {
    return {
        type: constants.UPDATE_PLOT_SELECTION,
        plotKey: plotKey,
        fieldSelection: fieldSelection,
        plotIndex: plotIndex
    }
};

export type RootAction = UpdateDatasetAction |
                         UpdatePlotSelectionAction
