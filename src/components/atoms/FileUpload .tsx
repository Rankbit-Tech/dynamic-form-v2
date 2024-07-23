import React, { useState } from 'react';
import { Form, Upload, Button, UploadFile, UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface FileUploadProps {
    label: string;
    name: string;
    validations: {
        required: boolean;
        acceptedFiles: string
        maxSize: number
    };
}


const FileUpload: React.FC<FileUploadProps> = ({ label, name, validations }) => {

    const [fileList, setFileList] = useState<UploadFile[]>([]);


    const { required } = validations || {};

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
            setFileList([...fileList, file]);

            return false;
        },
        fileList,
    };
    return (
        <Form.Item label={label} name={name} valuePropName="fileList" getValueFromEvent={e => e?.fileList} rules={rules}>
            <Upload  {...props}>
                <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
        </Form.Item>
    );
};

export default FileUpload;





