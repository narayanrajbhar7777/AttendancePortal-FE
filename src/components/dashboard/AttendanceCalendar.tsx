import { buildCalendar } from "../../utils/calendar";
import { formatMonthYear } from "../../utils/date";
import { getStatusClasses, getStatusLabel } from "../../utils/attendance";
import type { AttendanceRecord, RegularizationResponse } from "../../types/attendance";

type Props = {
  year: number;
  month: number;
  records: AttendanceRecord[];
  onOpenModal: (cell: any) => void;
  regularizationResponse: RegularizationResponse;
};

const AttendanceCalendar = ({ year, month, records, onOpenModal }: Props) => {
  const cells = buildCalendar(year, month, records);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="bg-white rounded-xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold font-headline">
          {formatMonthYear(year, month)}
        </h3>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => (
          <div
            key={day}
            className="bg-slate-100 p-3 text-center text-xs font-bold uppercase text-slate-500 rounded"
          >
            {day}
          </div>
        ))}

        {cells.map((cell, index) => {
          const isMissingPunch = cell.record?.attendanceStatus === "MISSING_PUNCH";

          // Check if there is already an existing request status from the API response
          const requestStatus = cell.record?.regularizationStatus;

          // ONLY clickable if it's a Missing Punch AND no request has been made yet
          const canApply = isMissingPunch && !requestStatus;

          return (
            <div
              key={`${cell.date}-${index}`}
              onClick={() => {
                if (canApply) onOpenModal(cell);
              }}
              className={`
                min-h-[120px] rounded-lg p-3 transition-all
                ${cell.record ? getStatusClasses(cell.record.attendanceStatus) : "bg-white"}
                ${!cell.isCurrentMonth ? "opacity-30" : ""}
                ${canApply ? "cursor-pointer hover:scale-105 border-2 border-orange-500" : "cursor-default opacity-80"}
            `}
            >
              {cell.isCurrentMonth && (
                <>
                  <div className="font-bold">{cell.day}</div>

                  {/* Show 'Pending' if requestStatus exists, otherwise show 'Missing Punch' */}
                  <div className="mt-1 text-xs font-semibold">
                    {requestStatus ? requestStatus : (cell.record ? getStatusLabel(cell.record.attendanceStatus) : "")}
                  </div>

                  {/* ... other code ... */}

                  {/* Hide "Click to Apply" if status is already Pending */}
                  {canApply && (
                    <div className="mt-2 text-[10px] text-orange-700 font-bold">
                      Click to Apply
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default AttendanceCalendar;