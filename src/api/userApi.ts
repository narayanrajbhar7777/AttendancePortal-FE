import { BASE_URL, USER_URL, type AttendanceRecord, type DashboardData } from "./constants/api-constant";

async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {

    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}${USER_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),

            ...options?.headers,
        },
    });

    if (res.status === 401) {
        localStorage.clear();
        window.location.href = "/";
        throw new Error("Session expired");
    }

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Something went wrong");
    }

    return res.json();
}

export const getDashboard = () =>
    apiRequest<DashboardData>("dashboard");

export const getUserAttendance = () =>
    apiRequest<AttendanceRecord[]>("attendance");

export const getRegularizationAction = async (id: number, status: string) => {
    return apiRequest<any>("action", {
        method: "POST",
        body: JSON.stringify({
            requestId: id,
            status: status,
        }),
    });
};