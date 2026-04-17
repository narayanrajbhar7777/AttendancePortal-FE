import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import AppTopbar from "../../components/layout/AppTopbar";
import { getUserAttendance } from "../../api/userApi";
import FullScreenStatus from "../../components/common/FullScreenStatus";

const UserAttendancePage = () => {

  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      const res = await getUserAttendance();
      const transformed = transformAttendance(res);
      setEmployees(transformed);
    } catch (err: any) {
      setError("Failed to load attendance");
    } finally {
      setLoading(false);
    }
  };

  const transformAttendance = (data: any[]) => {
    return data.map((emp) => {
      const attendanceMap: Record<number, string> = {};

      emp.attendance.forEach((a: any) => {
        const day = new Date(a.date).getDate();
        attendanceMap[day] = a.status;
      });

      return {
        id: emp.id,
        name: emp.name,
        role: "Employee",
        avatar: `https://i.pravatar.cc/40?img=${emp.id}`,
        attendance: attendanceMap,
      };
    });
  };

  const getColor = (status?: string) => {
    if (status === "PRESENT") return "bg-green-500";
    if (status === "ABSENT") return "bg-red-500";
    if (status === "PENDING") return "bg-gray-400";
    return "bg-gray-200";
  };

  if (loading) return <FullScreenStatus type="loading" />;
  if (error) return <FullScreenStatus type="error" message={error} />;

  return (
    <DashboardLayout topbar={<AppTopbar employeeName={"Em"} employeeRole={"M"} />}>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-blue-900">
          Monthly Attendance
        </h2>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-auto">

        <table className="min-w-full text-sm">

          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="p-3 text-left">Employee</th>

              {days.map((d) => (
                <th key={d} className="p-2 text-xs text-gray-500">
                  {d}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="border-t">

                <td className="p-3 flex items-center gap-3 sticky left-0 bg-white">
                  <img src={emp.avatar} className="w-8 h-8 rounded" />

                  <div>
                    <p className="font-semibold">{emp.name}</p>
                    <p className="text-xs text-gray-500">{emp.role}</p>
                  </div>
                </td>

                {days.map((d) => (
                  <td key={d} className="text-center">
                    <div
                      className={`w-3 h-3 mx-auto rounded-full ${getColor(
                        emp.attendance[d]
                      )}`}
                    />
                  </td>
                ))}

              </tr>
            ))}
          </tbody>

        </table>

      </div>

      {/* LEGEND */}
      <div className="flex gap-6 mt-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          Present
        </div>

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          Absent
        </div>

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-400 rounded-full" />
          Pending
        </div>
      </div>

    </DashboardLayout>
  );
};

export default UserAttendancePage;