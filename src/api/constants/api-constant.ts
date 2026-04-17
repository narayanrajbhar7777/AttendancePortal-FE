export interface DashboardData {
    totalEmployees: number;
    activeRequests: number;

}

export interface AttendanceRecord {
    id: number;
    date: string;
    status: 'PRESENT' | 'LATE_IN' | 'ABSENT';
}

export const BASE_URL = "http://localhost:8080";

export const EMPLOYEE_URL = "/api/v1/employee/";

export const USER_URL = "/api/v1/user/";

export const LOGIN_URL = "/api/v1/auth/login";


