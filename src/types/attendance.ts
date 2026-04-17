export type AttendanceStatus =
    | "PRESENT"
    | "ABSENT"
    | "LATE_IN"
    | "EARLY_OUT"
    | "MISSING_PUNCH";

export interface Employee {
    id: number;
    userId: number;
    firstName: string;
    lastName: string;
    mobileNo: string;
}

export interface AttendanceRecord {
    id: number;
    empId: number;
    date: string;
    inTime: string | null;
    outTime: string | null;
    attendanceStatus: AttendanceStatus;
    workingHours: string;
    regularizationStatus?: "PENDING" | "APPROVED" | "REJECTED";
}

export interface EmployeeDashboardResponse {
    id: number;
    employee: Employee;
    attendance: AttendanceRecord[];
}

export interface RegularizationRequest {
    employeeId: number;
    userId: number;
    type: string;
    status: string;
    regularizationDate: string;
    reason: string;
}

export interface RegularizationResponse {
    regularizationDate: string,
    regularizationStatus: string
}
