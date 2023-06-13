import { dayNames } from "../Store/StoreCalendar";

export const getNumberOfDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
}

export const getStoredDay = (year: number, month: number): string[] => {
    const dayIndex = new Date(year, month, 1).getDay();
    const firstHalf = dayNames.slice(dayIndex);
    return [...firstHalf, ...dayNames.slice(0, dayIndex)];
}

export const range = (start:number, end:number):number[] => {
    const length = Math.abs((end - start) / 1);

    const { result } = Array.from({ length }).reduce(
        ({ result, current }) => ({
            result: [...result, current],
            current: current + 1,
        }),
        {result: [], current: start}
    );
    
    return result;
}