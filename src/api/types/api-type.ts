export interface DashboardData {
    totalEmployees: number;
    activeRequests: number;
}

export interface AttendanceRecord {
    id: number;
    date: string;
    status: 'PRESENT' | 'LATE_IN' | 'ABSENT';
}