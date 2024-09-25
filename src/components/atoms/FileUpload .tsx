import React, { useState } from 'react';
import { Form, Upload, Button, UploadFile, UploadProps, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface FileUploadProps {
    label: string;
    name: string;
    validations: {
        required?: boolean;
        accept?: string
        maxSize?: number
        maxCount?: number
        multiple?: boolean
    };
}


const FileUpload: React.FC<FileUploadProps> = ({ label, name, validations }) => {

    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const { required, maxCount, accept, maxSize, multiple } = validations || {};

    const rules = [
        { required, message: `Please upload your ${label}` },

    ];
    const props: UploadProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            const isFileSizeValid = maxSize && file.size <= maxSize * 1024 || true;

            if (maxSize && !isFileSizeValid) {
                message.error(`File must be smaller or equal to ${maxSize}MB!`);
                return Upload.LIST_IGNORE;
            }
            setFileList((prevFileList) => [...prevFileList, file]);
            return false;
        },
        fileList,
    };
    return (
        <Form.Item label={label} name={name} valuePropName="fileList" getValueFromEvent={e => e?.fileList} rules={rules}>
            <Upload  {...props} maxCount={maxCount} accept={accept} multiple={multiple} >
                <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
        </Form.Item>
    );
};

export default FileUpload;





