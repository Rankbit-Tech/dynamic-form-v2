import React from 'react';
import { Upload, UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface FileUploadProps extends UploadProps {
    label: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ label, ...uploadProps }) => {
    return (
        <div className="flex items-center space-x-2">
            <label className="text-gray-700">{label}</label>
            <Upload {...uploadProps}>
                <button className="btn btn-primary">
                    <UploadOutlined /> Click to Upload
                </button>
            </Upload>
        </div>
    );
};

export default FileUpload;
