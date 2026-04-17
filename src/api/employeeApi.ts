import type { RegularizationRequest } from "../types/attendance";
import api from "./axios";
import { EMPLOYEE_URL } from "./constants/api-constant";

export const getEmployeeDashboard = async (id: number, month: number, year: number) => {
  try {
    const response = await api.get(`${EMPLOYEE_URL}${id}/dashboard`, {
      params: { month, year },
    });

    return response.data;
  } catch (error: any) {
    throw error?.response?.data?.message || "Failed to load dashboard";
  }
};

export const getEmployeeIdWiseAttendance = async (id: number) => {
  try {
    const response = await api.get(`${EMPLOYEE_URL}${id}/attendance`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data?.message || "Failed to load attendance";
  }
};

export const createRegularization = async (request: RegularizationRequest) => {
  try {
    const response = await api.post(`${EMPLOYEE_URL}regularization`, request);

    return response.data;
  } catch (error: any) {
    throw error?.response?.data?.message || "Failed to submit request";
  }
};