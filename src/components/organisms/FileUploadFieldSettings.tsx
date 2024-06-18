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
            <Form.Item label="Placeholder">
                <Input />
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
