import type { AttendanceRecord } from "../../types/attendance";
import { formatTime } from "../../utils/date";

type Props = {
  todayRecord?: AttendanceRecord;
};

const DailyStatusCard = ({ todayRecord }: Props) => {
  return (
    <div className="bg-white rounded-xl p-6 border-l-4 border-primary">
      <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
        Daily Status
      </p>
      <div className="text-2xl font-bold text-primary">
        {formatTime(todayRecord?.inTime ?? null)}
      </div>
      <p className="text-sm text-slate-500 mt-1">Check-in</p>
      <div className="mt-4 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
        {todayRecord?.attendanceStatus === 'LATE_IN' ? 'Late In' : (todayRecord?.attendanceStatus ?? "No Record")}
      </div>
    </div>
  );
};

export default DailyStatusCard;