import { Button, Input } from 'antd';
import useAadharVerify from '@hooks/useAadharVerify';
import { onlyNumberInput } from '@utils/index';

const AadharCard: React.FC = (config) => {

    const { aadharInputRef, handleSendOTP, otpInputRef, isAadharValid, handleAadharChange, handleAadharData, handleOtpChange, loading } = useAadharVerify(config);

    return (
        <div className="relative rounded">
            <div className='p-3 w-full md:w-1/2 lg:w-1/3'>
                <div className='flex items-center gap-2 mt-5 justify-center'>
                    <Input ref={aadharInputRef} min={12} max={12} required placeholder="Enter Aadhar Number" onPasteCapture={(e) => e.preventDefault()} onKeyDown={onlyNumberInput} onChange={handleAadharChange} />
                    <Button type='primary' onClick={handleSendOTP} loading={loading}>Send OTP</Button>
                </div>
                {isAadharValid && (<div className='flex items-center gap-2 mt-5'>
                    <Input ref={otpInputRef} onChange={handleOtpChange} onPasteCapture={(e) => e.preventDefault()} placeholder='Enter OTP' />
                    <Button type='primary' onClick={handleAadharData} loading={loading}>Verify OTP</Button>
                </div>)}
            </div>
        </div>
    );

}
export default AadharCard;
