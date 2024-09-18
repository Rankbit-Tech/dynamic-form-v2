import axios from "axios"

export async function checkAadhar(aadharNumber: number) {
    const response = await axios.get(`/api/pass/checkAadhar?aadhar=${aadharNumber}`);
    return response
}


type headersType = Record<string, any>
interface urlsType {
    aadhar_verify: string,
    otp_verify: string
}

export class AadharManager {
    private headers: headersType
    private urls: urlsType

    constructor(headers: headersType, urls: urlsType) {
        this.headers = headers
        this.urls = urls
    }


    async sendOTP(aadharNumber: string) {

        if (!aadharNumber) throw new Error("Aadhar number if required")
        const response = await axios.post(this.urls.aadhar_verify, {
            aadhaarNumber: aadharNumber
        },
            {
                headers: this.headers
            }

        )

        return response
    }

    async verifyOTP(requestId: string, otp: number) {
        if (!requestId || !otp) throw new Error("OTP required")
        const response = await axios.post(this.urls.otp_verify, { requestId, otp })
        return response
    }
}