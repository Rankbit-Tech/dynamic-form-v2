import React from 'react';
import { Input, Form } from 'antd';

const FileUploadFieldSettings: React.FC = () => {
    return (
        <Form layout="vertical">
            <Form.Item label="Label" name="label">
                <Input />
            </Form.Item>
            <Form.Item label="Name" name='name'>
                <Input />
            </Form.Item>

            <Form.Item label="Accepted File Types" name="acceptFiles">
                <Input placeholder="e.g., .jpg, .png, .pdf" />
            </Form.Item>
            <Form.Item label="Max File Size (MB)" name="maxSize">
                <Input type="number" placeholder="e.g., 5" />
            </Form.Item>
        </Form>
    );
};

export default FileUploadFieldSettings;
