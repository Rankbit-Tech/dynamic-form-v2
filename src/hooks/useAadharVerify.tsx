import { sendOTP, verifyOTP } from '@api/aadhardata';
import { useFormStore } from '@store/useFormStore';
import { InputRef } from 'antd';
import React, { useRef, useState } from 'react'
import useEventBus from './useEventBus';
import { fieldTypes } from '@constants/fieldTypes';
import findValue from '@lib/findValue';
import { transformAadharData } from '@utils/tranformAadharData';



interface OtpTypes {
    requestId: string,
    otpSentStatus: boolean,
    if_number: boolean,
    isValidAadhaar: boolean,
    status: string
}



const useAadharVerify = () => {

    const [loading] = useState<boolean>(false)
    const [isAadharValid, setAadharValid] = useState(false)
    const [aadharNumber, setAadharNumber] = useState("")
    const [otp, setOtp] = useState<number | null>(null)

    const [otpData, setOtpData] = useState<OtpTypes | Record<string, any>>({});


    const aadharInputRef = useRef<InputRef | null>(null)
    const otpInputRef = useRef<InputRef | null>(null)

    const handleAadharChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        if (!value) return

        if (value.length == 12) {
            aadharInputRef?.current?.blur()
        }
        setAadharNumber(value)
    }

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        if (value.length == 6) {
            otpInputRef?.current?.blur()
        }

        setOtp(Number(value))
    }

    const handleSendOTP = async () => {

        try {
            if (!aadharNumber || aadharNumber.length !== 12) return
            const res = await sendOTP(aadharNumber);

            if (res.status == 200) {
                setOtpData(res.data.data);
                setAadharValid(true)
            }
        } catch (error) {
            console.log(error)
        }
    }


    const { emitEvent } = useEventBus()

    const AdharCardOptions = useFormStore(state => {
        return state.fields?.find(field => field.type == fieldTypes.AADHAR)?.mapFields || {}
    })

    const handleAadharData = async () => {
        try {
            if (!otpData.requestId || !otp) return

            const response = await verifyOTP(otpData.requestId, otp)
            const data = response?.data?.data as any;
            const mapping = AdharCardOptions;

            const mapData = await transformAadharData(data, mapping, emitEvent);

            emitEvent("sendAdharData", mapData)
        } catch (error) {

        }
    }
    return {
        loading,
        isAadharValid,
        handleSendOTP,
        aadharInputRef,
        otpInputRef,
        otp,
        handleOtpChange,
        handleAadharChange,
        handleAadharData
    }
}

export default useAadharVerify