import { api } from "../../auth/services/auth.api";

export async function getAllReports(page = 1, limit = 10) {
    const response = await api.get(`/api/interview?page=${page}&limit=${limit}`);
    return response.data;
}

export async function getReport(interviewId) {
    const response = await api.get(`/api/interview/report/${interviewId}`);
    return response.data;
}

export async function generateReport(formData) {
    const response = await api.post("/api/interview", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data;
}
