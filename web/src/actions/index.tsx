import * as constants from '../constants';
import Dataset from '../data/Dataset';

export interface UpdateDataset {
    type: constants.UPDATE_DATASET;
    calendarDate: string;
    dataset: Dataset;
}
export type UpdateDatasetAction = UpdateDataset;
export function updateDataset(calendarDate: string, dataset: Dataset): UpdateDataset {
    return {
        type: constants.UPDATE_DATASET,
        calendarDate: calendarDate,
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

export interface UpdateDate {
    type: constants.UPDATE_DATE;
    calendarDate: string;
}
export type UpdateDateAction = UpdateDate;
export function updateDate(calendarDate: string): UpdateDate {
    return {
        type: constants.UPDATE_DATE,
        calendarDate: calendarDate,
    }
};

export type RootAction = UpdateDatasetAction |
                         UpdatePlotSelectionAction |
                         UpdateDateAction
