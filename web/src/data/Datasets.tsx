import Dataset from "./Dataset";

export default interface Datasets {
    data: {[key: string] : Dataset}
    calendarDate: string;
}