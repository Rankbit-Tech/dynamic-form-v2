import React from 'react';
import { Form, Upload, Button, UploadFile } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { RuleObject } from 'antd/es/form';

interface FileUploadProps {
    label: string;
    name: string;
    validations: {
        required: boolean;
        Rule?: {
            maxCount?: number;
            fileType?: string[];
        };
    };
}


const FileUpload: React.FC<FileUploadProps> = ({ label, name, validations }) => {
    const { required, Rule } = validations || {};

    const rules = [
        { required, message: `Please upload your ${label}` },
        ...(Rule ? [{
            validator: async (_: RuleObject, value: { fileList: UploadFile[] }) => {
                if (!value || value.fileList.length === 0) {
                    return Promise.reject(new Error(`Please upload your ${label}`));
                }
                if (Rule.maxCount && value.fileList.length > Rule.maxCount) {
                    return Promise.reject(new Error(`You can only upload up to ${Rule.maxCount} files`));
                }
                if (Rule.fileType && value.fileList.some((file: UploadFile) => !Rule.fileType!.includes(file.type))) {
                    return Promise.reject(new Error(`You can only upload ${Rule.fileType.join(', ')} files`));
                }
                return Promise.resolve();
            }
        }] : [])
    ];

    return (
        <Form.Item label={label} name={name} valuePropName="fileList" getValueFromEvent={e => e?.fileList} rules={rules}>
            <Upload >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
        </Form.Item>
    );
};

export default FileUpload;





