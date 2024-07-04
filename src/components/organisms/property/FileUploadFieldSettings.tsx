import React from 'react';
import { Input, Form, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import useSettingsForm from '@hooks/useSettingsForm';

const FileUploadFieldSettings: React.FC = () => {
const { handleValuesChange, values } = useSettingsForm();

    return (
        <Form layout="vertical" initialValues={values} onValuesChange={handleValuesChange}>
            <Form.Item label="Label" name="label">
                <Input />
            </Form.Item>
            <Form.Item label="Name" name="name">
                <Input />
            </Form.Item>

            <Form.Item label="Accepted File Types" name="acceptedfiletypes">
                <Input placeholder="e.g., .jpg, .png, .pdf" />
            </Form.Item>
            <Form.Item label="Max File Size (MB)">
                <Input type="number" placeholder="e.g., 5" />
            </Form.Item>
            <Form.Item label="Default File" name="defaultfile">
                <Upload>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </Form.Item>
            {/* Add more settings as needed */}
        </Form>
    );
};

export default FileUploadFieldSettings;
