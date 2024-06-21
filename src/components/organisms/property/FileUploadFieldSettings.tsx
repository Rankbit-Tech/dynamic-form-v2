import React from 'react';
import { Input, Form, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const FileUploadFieldSettings: React.FC = () => {
    return (
        <Form layout="vertical">
            <Form.Item label="Label">
                <Input />
            </Form.Item>
            <Form.Item label="Name">
                <Input />
            </Form.Item>

            <Form.Item label="Accepted File Types">
                <Input placeholder="e.g., .jpg, .png, .pdf" />
            </Form.Item>
            <Form.Item label="Max File Size (MB)">
                <Input type="number" placeholder="e.g., 5" />
            </Form.Item>
            <Form.Item label="Default File">
                <Upload>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </Form.Item>
            {/* Add more settings as needed */}
        </Form>
    );
};

export default FileUploadFieldSettings;
