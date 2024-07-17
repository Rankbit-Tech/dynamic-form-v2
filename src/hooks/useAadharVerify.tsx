import { checkAadhar, sendOTP, verifyOTP } from '@api/aadhardata';
import { aadharData } from '@components/molecules/data';
import { useFormStore } from '@store/useFormStore';
import { InputRef } from 'antd';
import React, { useRef, useState } from 'react'
import useEventBus from './useEventBus';
import { fieldTypes } from '@constants/fieldTypes';
import findValue from '@lib/findValue';


interface OtpTypes {
    requestId: string,
    otpSentStatus: boolean,
    if_number: boolean,
    isValidAadhaar: boolean,
    status: string
}

const formatAddress = (address: any) => {
    const addressFields = ['house', 'street', 'landmark', 'loc', 'vtc', 'po', 'subdist', 'dist', 'state', 'country'];
    return addressFields
        .filter(field => address[field])
        .map(field => address[field])
        .join(', ');
}

const useAadharVerify = () => {

    const [loading, setLoading] = useState<boolean>(false)
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
            console.log(response)
            const data = response?.data?.data as any;
            const mapping = AdharCardOptions;

            const mappedData: any = {};
            const name = data.full_name.split(" ");
            const firstName = name[0];
            const middleName = name.length > 2 ? name[1] : '';
            const lastName = name.length > 2 ? name[2] : name[1];

            Object.entries(mapping).forEach((item) => {
                const [key, value]: [string, any] = item || []

                switch (key) {
                    case "first_name":
                        mappedData[value] = firstName;
                        break;
                    case "middle_name":
                        mappedData[value] = middleName;
                        break;
                    case "last_name":
                        mappedData[value] = lastName;
                        break;
                    case "address":
                        mappedData[value] = formatAddress(data.address);
                        break;
                    case "aadhar_image":
                        emitEvent(`sendAadharProfile-${value}`, `data:image/png;base64, ${data?.profile_image}`)
                        break;
                    default:
                        mappedData[value] = findValue(data, key);
                }
            })

            emitEvent("sendAdharData", mappedData)
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