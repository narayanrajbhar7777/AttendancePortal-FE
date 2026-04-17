import { useEffect, useRef, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import AppTopbar from "../../components/layout/AppTopbar";
import FullScreenStatus from "../../components/common/FullScreenStatus";
import { getDashboard, getRegularizationAction } from "../../api/userApi";
import { toast } from "react-toastify";

const UserDashboardPage = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const hasFetched = useRef(false);
    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            const res = await getDashboard();
            setData(res);
        } catch (err: any) {
            setError("Failed to load dashboard");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (id: number, status: string) => {
        try {
            const res = await getRegularizationAction(id, status);
            console.log(`RESP: ${res}`)
            loadDashboard(); 
            toast.success(`Request ${status.toLowerCase()} successfully`);


        } catch (err: any) {
            console.error(err);
            toast.error("Failed to process action: " + err);
        }
    };

    if (loading) return <FullScreenStatus type="loading" />;
    if (error) return <FullScreenStatus type="error" message={error} />;
    if (!data) return null;

    return (
        <DashboardLayout topbar={<AppTopbar employeeName={data.user.name} employeeRole={data.user.role} />}>
            <div className="flex justify-between items-end mb-10">
                <div>
                    <p className="text-xs tracking-widest text-blue-600 font-semibold uppercase">Active Approval Queue</p>

                    <h1 className="text-6xl font-bold text-blue-900">
                        {data.totalPending}
                        <span className="text-lg text-gray-500 ml-2">Pending</span>
                    </h1>
                </div>

                <div className="flex gap-4">
                    <div className="bg-white px-5 py-3 rounded-xl shadow-sm">
                        <p className="text-xs text-gray-500">AVG. RESPONSE TIME</p>
                        <p className="text-xl font-bold">{data.avgResponseTime}</p>
                    </div>

                    <div className="bg-white px-5 py-3 rounded-xl shadow-sm">
                        <p className="text-xs text-gray-500">TODAY'S PROCESSED</p>
                        <p className="text-xl font-bold">{data.todayProcessed}</p>
                    </div>
                </div>

            </div>

            {/* REQUEST CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {data.requests.map((req: any) => (
                    <div key={req.id} className="bg-white p-6 rounded-2xl shadow-sm">

                        {/* TOP */}
                        <div className="flex justify-between items-center mb-4">

                            <div className="flex items-center gap-3">
                                <img
                                    src={req.avatar}
                                    className="w-12 h-12 rounded-lg object-cover"
                                />

                                <div>
                                    <h3 className="font-semibold">{req.name}</h3>
                                    <p className="text-xs text-gray-500">{req.role}</p>
                                </div>
                            </div>

                            <span className="bg-gray-200 text-xs px-3 py-1 rounded-full">
                                {req.type}
                            </span>
                        </div>

                        {/* DATE */}
                        <p className="text-sm text-blue-700 mb-3">
                            📅 {req.date} • {req.time}
                        </p>

                        {/* REASON */}
                        <div className="bg-gray-100 p-3 rounded-lg text-sm text-gray-600 mb-4">
                            {req.reason}
                        </div>

                        {/* STATUS */}
                        {req.status !== "PENDING" ? (
                            <div
                                className={`text-center py-2 rounded-lg font-semibold
                  ${req.status === "APPROVED"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {req.status}
                            </div>
                        ) : (
                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleAction(req.id, "APPROVED")}
                                    className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                                >
                                    ✔ Approve
                                </button>

                                <button
                                    onClick={() => handleAction(req.id, "REJECTED")}
                                    className="flex-1 bg-red-200 text-red-700 py-2 rounded-lg hover:bg-red-300"
                                >
                                    ✖ Reject
                                </button>
                            </div>
                        )}

                    </div>
                ))}

            </div>

            {/* METRICS */}
            <div className="mt-12 bg-slate-100 p-6 rounded-2xl">

                <div className="flex justify-between mb-6">
                    <h3 className="text-lg font-semibold text-blue-900">
                        Regional Compliance Pulse
                    </h3>

                    <p className="text-sm text-gray-500">
                        Last updated: few seconds ago
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                    <div className="bg-white p-4 rounded-xl text-center">
                        <p className="text-xl font-bold">98%</p>
                        <p className="text-xs text-gray-500">Presence Accuracy</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl text-center">
                        <p className="text-xl font-bold">1.2h</p>
                        <p className="text-xs text-gray-500">Overtime Trend</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl text-center">
                        <p className="text-xl font-bold">04</p>
                        <p className="text-xs text-gray-500">Critical Discrepancy</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl text-center">
                        <p className="text-xl font-bold">92m</p>
                        <p className="text-xs text-gray-500">Avg Shift Duration</p>
                    </div>

                </div>

            </div>

        </DashboardLayout>
    );
};

export default UserDashboardPage;