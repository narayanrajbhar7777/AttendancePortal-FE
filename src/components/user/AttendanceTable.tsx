import StatusDot from "./StatusDot";

const days = Array.from({ length: 31 }, (_, i) => i + 1);

const AttendanceTable = ({ data }: any) => {
  return (
    <div className="overflow-auto bg-white rounded-xl shadow">

      <table className="min-w-full text-sm">

        <thead>
          <tr>
            <th className="p-2">Employee</th>
            {days.map((d) => (
              <th key={d} className="p-2">{d}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((emp: any) => (
            <tr key={emp.id}>
              <td className="p-2 font-bold">{emp.name}</td>

              {days.map((day) => {
                const record = emp.attendance.find(
                  (a: any) => new Date(a.date).getDate() === day
                );

                return (
                  <td key={day} className="text-center">
                    <StatusDot status={record?.status} />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
};

export default AttendanceTable;