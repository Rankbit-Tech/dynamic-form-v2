import React, { useState } from "react";
import { Form, Upload, Button, UploadFile, UploadProps, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

interface FileUploadProps {
  label: string;
  name: string;
  validations: {
    required?: boolean;
    accept?: string;
    maxSize?: number;
    maxCount?: number;
    multiple?: boolean;
  };
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  name,
  validations,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { required, maxCount, accept, maxSize, multiple } = validations || {};

  const rules = [{ required, message: `Please upload your ${label}` }];
  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      if (!maxSize) return true;
      const isFileSizeValid = file.size <= maxSize * 1024 * 1024;

      if (!isFileSizeValid) {
        message.error(`File must be smaller or equal to ${maxSize}MB!`);
        setFileList([]);
        return Upload.LIST_IGNORE;
      }
      return false;
    },
    maxCount: multiple ? maxCount : 1,
    accept,
    multiple,
    fileList,
  };

  const UPLAOD_LABLE = multiple ? "Upload File" : "Upload Files";

  return (
    <>
      <Form.Item
        label={label}
        name={name}
        valuePropName="fileList"
        getValueFromEvent={(e) => e?.fileList}
        rules={rules}
      >
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>{UPLAOD_LABLE}</Button>
        </Upload>
      </Form.Item>
    </>
  );
};

export default FileUpload;
