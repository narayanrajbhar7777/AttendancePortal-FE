import { useEffect, useMemo, useRef, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import AppTopbar from "../../components/layout/AppTopbar";
import DailyStatusCard from "../../components/dashboard/DailyStatusCard";
import EfficiencyCard from "../../components/dashboard/EfficiencyCard";
import ShortfallAlertCard from "../../components/dashboard/ShortfallAlertCard";
import HistoryCard from "../../components/dashboard/HistoryCard";
import AttendanceCalendar from "../../components/dashboard/AttendanceCalendar";
import RegularizationModal from "../../components/dashboard/RegularizationModal";
import { getEmployeeDashboard, getEmployeeIdWiseAttendance } from "../../api/employeeApi";
import { calculateAverageHours, calculateShortfall } from "../../utils/attendance";
import type { AttendanceRecord, EmployeeDashboardResponse } from "../../types/attendance";
import FullScreenStatus from "../../components/common/FullScreenStatus";


const EmployeeDashboardPage = () => {
    const [data, setData] = useState<EmployeeDashboardResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedCell, setSelectedCell] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const hasFetched = useRef(false);

    const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

    const employeeId = 2;
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            setLoading(true);
            const res = await getEmployeeDashboard(employeeId, month, year);
            console.log(`API_REPONSE: ${JSON.stringify(res)}`);
            setData(res);
        } catch (err: any) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (cell: any) => {
        setSelectedCell(cell);
        setIsModalOpen(true);
    };

    const averageHours = useMemo(() => {
        if (!data) return "0.00";
        return calculateAverageHours(data.attendance);
    }, [data]);

    const shortfall = useMemo(() => {
        if (!data) return "0:00";
        return calculateShortfall(data.attendance);
    }, [data]);

    const fetchAttendance = async () => {
        const data = await getEmployeeIdWiseAttendance(employeeId) as AttendanceRecord[];

        setAttendanceRecords(data);
    };

    const todayRecord = data?.attendance.find((a) => a.date === "2026-01-02");

    if (loading) {
        return <FullScreenStatus type="loading" />;
    }

    if (error) {
        return <FullScreenStatus type="error" message={error} />;
    }

    if (!data) {
        return <div className="p-10 text-red-600">Failed to load dashboard.</div>;
    }

    return (
        <>
            <DashboardLayout
                topbar={
                    <AppTopbar
                        employeeName={`${data?.employee?.firstName ?? "KG"} ${data?.employee?.lastName ?? "KA"}`} employeeRole="Employee" />
                }
            >
                <header className="mb-8">
                    <h2 className="text-3xl font-bold font-headline">Attendance Overview</h2>
                    <p className="text-slate-500 mt-2">
                        Employee attendance dashboard
                    </p>
                </header>

                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 lg:col-span-4 space-y-6">
                        <DailyStatusCard todayRecord={todayRecord} />
                        <EfficiencyCard averageHours={averageHours} />
                        <ShortfallAlertCard shortfall={shortfall} />
                        <HistoryCard records={data.attendance} />
                    </div>

                    <div className="col-span-12 lg:col-span-8">
                        <AttendanceCalendar
                            year={year}
                            month={month}
                            records={data.attendance}
                            onOpenModal={handleOpenModal}
                            regularizationResponse={null}
                        />
                    </div>
                </div>
            </DashboardLayout>


            <RegularizationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                employeeId={data?.employee?.id?? 1}
                userId={data?.employee?.userId ?? 1}
                date={selectedCell?.date}
                onSuccess={() => {
                    loadDashboard();
                    fetchAttendance();
                }}
                regularizationResponse={null}
            />
        </>
    );
};

export default EmployeeDashboardPage;