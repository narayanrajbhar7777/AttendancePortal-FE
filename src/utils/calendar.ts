import type { AttendanceRecord } from "../types/attendance";

export interface CalendarCell {
    day: number;
    date: string;
    record?: AttendanceRecord;
    isCurrentMonth: boolean;
}

export const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month, 0).getDate();

export const buildCalendar = (
    year: number,
    month: number,
    attendance: AttendanceRecord[]
): CalendarCell[] => {
    const firstDay = new Date(year, month - 1, 1).getDay();
    const totalDays = getDaysInMonth(year, month);

    const recordMap = new Map(attendance.map((a) => [a.date, a]));

    const cells: CalendarCell[] = [];

    for (let i = 0; i < firstDay; i++) {
        cells.push({
            day: 0,
            date: "",
            isCurrentMonth: false,
        });
    }

    for (let day = 1; day <= totalDays; day++) {
        const isoDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        cells.push({
            day,
            date: isoDate,
            record: recordMap.get(isoDate),
            isCurrentMonth: true,
        });
    }

    return cells;
};