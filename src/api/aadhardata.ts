import axios from "axios"

const instance = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjRjOTczMmM2OWQ1NmVlZWI2MjEyZDMiLCJvcmdJZCI6IkRPT1IwMSIsInVzZXJpZCI6IkRPT1JHT0FTVVAwMSIsImVtYWlsSWQiOiJhbm5lc2hkMTRAeW9wbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJEb29yIEdvYSIsImxhc3ROYW1lIjoiU3VwZXJ2aXNvciIsImxldmVsIjpudWxsLCJsb2NhdGlvbiI6IkcwMSIsImxvY2F0aW9uSWQiOm51bGwsInJvbGUiOiJzdXBlcnZpc29yIiwicm9sZU5hbWUiOnsicGVybWlzc2lvbnMiOnsiT25ib2FyZF9Xb3JrbWVuIjp7ImFjY2VzcyI6dHJ1ZSwiY3JlYXRlIjp0cnVlLCJlZGl0Ijp0cnVlLCJpbXBvcnQiOmZhbHNlLCJleHBvcnQiOnRydWUsInZpZXciOnRydWV9LCJXb3JrbWVuX0Rhc2hib2FyZCI6eyJhY2Nlc3MiOnRydWUsImNyZWF0ZSI6dHJ1ZSwiZWRpdCI6dHJ1ZSwiaW1wb3J0IjpmYWxzZSwiZXhwb3J0Ijp0cnVlLCJ2aWV3Ijp0cnVlfSwiQnVsa19VcGxvYWQiOnsiYWNjZXNzIjp0cnVlLCJjcmVhdGUiOnRydWUsImVkaXQiOnRydWUsImltcG9ydCI6dHJ1ZSwiZXhwb3J0Ijp0cnVlLCJ2aWV3Ijp0cnVlfX0sInNlbGVjdGVkUm9sZVR5cGUiOiJTdXBlcnZpc29yIn0sInN1cHBsaWVySWQiOiJBMDEiLCJ1bml0SWQiOm51bGwsImlzUGFzc3dvcmRDaGFuZ2VkIjp0cnVlLCJvbGRUaHJlZVBhc3N3b3JkIjpbImMwMDkwNjE1ZDQxN2UwM2Y4YThhMWVhOThjMzlhNTc0NTM3OWMzNWFmNjBlOGUxYTQ4NjY1NTU0MDM2NTY1YTg0Yjk4MzdkZDRmODhjNWUzNWE2NjdlZWQ0NzJkZjFkZDEwYWEzODlkNmQwZjE5YTAyNWYyZWEzNzM1MDY4OWU2Il0sInVzZXJUeXBlIjoiQWN0aXZlIiwiaWF0IjoxNzIxMjEwNjQ2LCJleHAiOjE3MjEyOTcwNDZ9.uXkOiRKtXrK5zXyUm_PU4Ekwr8GgorxA2U583cFs3Dw"
    }
})

export async function checkAadhar(aadharNumber: number) {
    const response = await instance.get(`/api/pass/checkAadhar?aadhar=${aadharNumber}`);
    return response
}

export async function sendOTP(aadharNumber: number) {
    const response = await instance.post("/api/newSendOtp", {
        aadhaarNumber: aadharNumber
    })

    return response
}

export async function verifyOTP(requestId: string, otp: number) {
    const response = await instance.post("/api/verifyOtp", { requestId, otp })
    return response
}