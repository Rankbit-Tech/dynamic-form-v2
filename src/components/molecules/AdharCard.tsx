import { Button, Input } from 'antd';
import { aadharData } from "./data"
import { useFormStore } from '@store/useFormStore';
import { fieldTypes } from '@constants/fieldTypes';
import useEventBus from '@hooks/useEventBus';


const AadharCard: React.FC = () => {

    const { emitEvent } = useEventBus()

    const AdharCardOptions = useFormStore(state => {
        return state.fields?.find(field => field.type == fieldTypes.AADHAR)?.mapFields || {}

    })
    // const labels = [
    //     { key: "aadhaar_number", value: "Aadhaar Number" },
    //     { key: "name", value: "Name" },
    //     { key: "long_name", value: "Long Name" },
    //     { key: "last_name", value: "Last Name" },
    //     { key: "middle_name", value: "Middle Name" },
    //     { key: "date_of_birth", value: "Date of Birth" },
    //     { key: "address", value: "Address" },
    //     { key: "gender", value: "Gender" },
    //     { key: "age", value: "Age" },
    //     { key: "father_name", value: "Father's Name" }

    // ];
    const handleAadharData = () => {
        const data = aadharData.data as any;
        const mapping = AdharCardOptions;

        const mappedData: any = {};
        const name = data.full_name.split(" ");
        const fistName = name[0];
        const middle_name = name[1];
        const last_name = name[2];

        Object.entries(mapping).forEach((item) => {
            const [key, value]: [string, any] = item || []
            switch (key) {
                case "first_name":
                    mappedData[value] = fistName;
                    break;
                case "middle_name":
                    mappedData[value] = middle_name;
                    break;
                case "last_name":
                    mappedData[value] = last_name;
                    break;
                default:
                    mappedData[value] = data[key];
            }
        })

        emitEvent("sendAdharData", mappedData)

    }


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
