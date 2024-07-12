import { Button, Input } from 'antd';
import { aadharData } from "./data"
import { useFormStore } from '@store/useFormStore';
import { fieldTypes } from '@constants/fieldTypes';
import useEventBus from '@hooks/useEventBus';
import findValue from '@lib/findValue';

const formatAddress = (address: any) => {
    const addressFields = ['house', 'street', 'landmark', 'loc', 'vtc', 'po', 'subdist', 'dist', 'state', 'country'];
    return addressFields
        .filter(field => address[field])
        .map(field => address[field])
        .join(', ');
}

const AadharCard: React.FC = () => {
    const { emitEvent } = useEventBus()
    const AdharCardOptions = useFormStore(state => {
        return state.fields?.find(field => field.type == fieldTypes.AADHAR)?.mapFields || {}
    })

    const handleAadharData = () => {
        const data = aadharData.data as any;
        const mapping = AdharCardOptions;
        emitEvent("sendAadharProfile", `data:image/png;base64, ${data?.profile_image}`)

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
                default:
                    mappedData[value] = findValue(data, key);
            }
        })

        emitEvent("sendAdharData", mappedData)
    }

    return (
        <div className="relative  border rounded bg-white shadow  ">
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
