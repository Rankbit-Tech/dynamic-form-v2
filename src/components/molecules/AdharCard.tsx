import { Button, Input } from 'antd';
import { aadharData } from "./data"
import { useFormStore } from '@store/useFormStore';
import { fieldTypes } from '@constants/fieldTypes';

interface AadharCardProps {
    label: string;
    value: string;
}

const AadharCard: React.FC<AadharCardProps> = (form) => {

    const AdharCardOptions = useFormStore(state => {
        return state.fields?.find(field => field.type == fieldTypes.AADHAR)?.mapFields || {}

    })



    const handleAadharData = () => {
        const data = aadharData.data;
        const mapping = AdharCardOptions;

        const mappedData = {};
        for (const [key, formField] of Object.entries(mapping)) {
            const fieldValue = data[key];
            if (fieldValue !== undefined) {
                mappedData[key] = fieldValue;
            }


        }
        //input -> name[adhar_card] = data.adhar_card
        // {adhar_card:89879898987,name:ajeet}




        return (
            <div className="relative border rounded bg-white shadow ">
                <div className='p-3 w-1/3'>
                    <div className='flex items-center gap-2 mt-5 justify-center'>
                        <Input placeholder="Enter Aadhar Number" />
                        <Button type='primary'>Send OTP</Button>
                    </div>
                    <div className='flex items-center gap-2 mt-5'>
                        <Input placeholder='Enter OTP' />
                        <Button type='primary' onClick={handleAadharData}>Verify OTP</Button>
                    </div>
                </div>
            </div>
        );
    }

    export default AadharCard;
