
import dayjs from 'dayjs';
import findValue from '@lib/findValue';

const formatAddress = (address: any) => {
    const addressFields = ['house', 'street', 'landmark', 'loc', 'vtc', 'po', 'subdist', 'dist', 'state', 'country'];
    return addressFields
        .filter(field => address[field])
        .map(field => address[field])
        .join(', ');
}

export const transformAadharData = (data: any, mapping: any, emitEvent: any) => {
    const mappedData: any = {};
    const name = data.full_name.split(" ");
    const firstName = name[0];
    const middleName = name.length > 2 ? name[1] : '';
    const lastName = name.length > 2 ? name[2] : name[1];

    Object.entries(mapping).forEach((item) => {
        const [key, value]: [string, any] = item || [];
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
                emitEvent(`sendAadharProfile-${value}`, `data:image/png;base64, ${data?.profile_image}`);
                break;
            case "dob":
                mappedData[value] = dayjs(data?.dob);
                break;
            default:
                mappedData[value] = findValue(data, key);
        }
    });

    return mappedData;
}
