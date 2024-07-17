import { Button, Input } from 'antd';
import useAadharVerify from '@hooks/useAadharVerify';
import { onlyNumberInput } from '@utils/index';

const AadharCard: React.FC = () => {

    const { aadharInputRef, handleSendOTP, otpInputRef, isAadharValid, handleAadharChange, handleAadharData, handleOtpChange, loading } = useAadharVerify();

    return (
        <div className="relative rounded">
            <div className='p-3 w-full md:w-1/2 lg:w-1/3'>
                <div className='flex items-center gap-2 mt-5 justify-center'>
                    <Input ref={aadharInputRef} min={12} max={12} name="aadhar_number" placeholder="Enter Aadhar Number" onKeyDown={onlyNumberInput} onChange={handleAadharChange} />
                    <Button type='primary' onClick={handleSendOTP}>Send OTP</Button>
                </div>
                {isAadharValid && (<div className='flex items-center gap-2 mt-5'>
                    <Input ref={otpInputRef} name="otp" onChange={handleOtpChange} placeholder='Enter OTP' />
                    <Button type='primary' onClick={handleAadharData}>Verify OTP</Button>
                </div>)}
            </div>
        </div>
    );

}
export default AadharCard;
