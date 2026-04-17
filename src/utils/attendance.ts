import type { AttendanceRecord, AttendanceStatus } from "../types/attendance";

export const getStatusLabel = (status: AttendanceStatus): string => {
  switch (status) {
    case "PRESENT":
      return "Present";
    case "ABSENT":
      return "Absent";
    case "LATE_IN":
      return "Late In";
    case "EARLY_OUT":
      return "Early Out";
    case "MISSING_PUNCH":
      return "Missing Punch";
    default:
      return status;
  }
};

export const getStatusClasses = (status: AttendanceStatus): string => {
  switch (status) {
    case "PRESENT":
      return "bg-green-200 text-green-900";
    case "ABSENT":
      return "bg-red-200 text-red-900";
    case "LATE_IN":
      return "bg-blue-200 text-blue-900";
    case "EARLY_OUT":
      return "bg-yellow-200 text-yellow-900";
    case "MISSING_PUNCH":
      return "bg-orange-200 text-orange-900";
    default:
      return "bg-white";
  }
};

export const calculateAverageHours = (records: AttendanceRecord[]): string => {
  const valid = records.filter((r) => r.workingHours !== "0:00");
  if (!valid.length) return "0.00";

  const totalMinutes = valid.reduce((sum, item) => {
    const [hours, minutes] = item.workingHours.split(":").map(Number);
    return sum + hours * 60 + minutes;
  }, 0);

  return (totalMinutes / valid.length / 60).toFixed(2);
};

export const calculateShortfall = (records: AttendanceRecord[]): string => {
  const requiredMinutes = records.length * 9 * 60;

  const actualMinutes = records.reduce((sum, item) => {
    const [hours, minutes] = item.workingHours.split(":").map(Number);
    return sum + hours * 60 + minutes;
  }, 0);

  const shortfall = requiredMinutes - actualMinutes;
  if (shortfall <= 0) return "0:00";

  const hours = Math.floor(shortfall / 60);
  const minutes = shortfall % 60;
  return `${hours}:${String(minutes).padStart(2, "0")}`;
};