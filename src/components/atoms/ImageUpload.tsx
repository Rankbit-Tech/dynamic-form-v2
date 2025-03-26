import React, { useState } from "react";
import {
  Form,
  Upload,
  Button,
  UploadFile,
  UploadProps,
  message,
  GetProp,
  Image,
} from "antd";
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

const ImageUpload: React.FC<FileUploadProps> = ({
  label,
  name,
  validations,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewImages, setPreviewImages] = useState<(string | undefined)[]>(
    []
  );

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
      const isFileSizeValid = (maxSize && file.size <= maxSize * 1024) || true;

      if (maxSize && !isFileSizeValid) {
        message.error(`File must be smaller or equal to ${maxSize}MB!`);
        return Upload.LIST_IGNORE;
      }
      setFileList((prevFileList) => [...prevFileList, file]);
      return false;
    },
    onChange: ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
      const filteredFiles = newFileList.filter((file) => file.originFileObj);
      const uniqueFiles = Array.from(
        new Map(filteredFiles.map((file) => [file.uid, file])).values()
      );

      setFileList(uniqueFiles);
      const imagePreviews = uniqueFiles.map((file) =>
        file.originFileObj ? URL.createObjectURL(file.originFileObj) : file.url
      );

      setPreviewImages(imagePreviews);
    },
    fileList,
    maxCount: multiple ? maxCount : 1,
    accept,
    multiple,
  };

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
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
      </Form.Item>
      <div className="flex gap-2 mt-4">
        {previewImages?.map((src, index) => (
          <Image key={index} src={src} width={100} height={100} />
        ))}
      </div>
    </>
  );
};

export default ImageUpload;
