import { formatTime } from "../../utils/date";
import { getStatusLabel } from "../../utils/attendance";
import type { AttendanceRecord } from "../../types/attendance";

type Props = {
  records: AttendanceRecord[];
};

const HistoryCard = ({ records }: Props) => {
  const recent = [...records].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);

  return (
    <div className="bg-white rounded-xl p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
        Historical Sequence
      </p>

      <div className="space-y-4">
        {recent.map((record) => (
          <div key={record.id} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">{record.date}</p>
              <p className="text-xs text-slate-500">
                {getStatusLabel(record.attendanceStatus)}
                {record.inTime ? ` (${formatTime(record.inTime)})` : ""}
              </p>
            </div>
            <div className="text-xs font-medium text-slate-400">{record.workingHours}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryCard;