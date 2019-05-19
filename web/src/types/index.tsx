import Datasets from "../data/Datasets";

export interface Series {
    xName: string;
    yName: string;
}

export interface DataPlot {
    series: Series[];
}

export interface PlotDashboardState {
    datasets: Datasets;
    plots: DataPlot[];
}