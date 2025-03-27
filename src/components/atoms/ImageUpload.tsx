import React, { useEffect, useState } from "react";
import {
  Form,
  Upload,
  Button,
  UploadFile,
  UploadProps,
  message,
  Image,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { normalizeFileList } from "@utils/index";

interface FileUploadProps {
  label: string;
  name: string;
  formConfig: Record<string, any>;
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
  formConfig,
  validations,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const form = Form.useFormInstance();
  const { required, maxCount, accept, maxSize, multiple } = validations || {};

  useEffect(() => {
    const value =
      form.getFieldValue(name) ||
      normalizeFileList(formConfig?.initialValues?.[name] || []);
    if (!value) return;
    setFileList(value);
  }, [form, name, formConfig?.initialValues]);

  const rules = [{ required, message: `Please upload your ${label}` }];
  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      const isFileSizeValid =
        (maxSize && file.size <= maxSize * 1024 * 1024) || true;

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
        {fileList?.map((file, index) => {
          const imageUrl = file.originFileObj
            ? URL.createObjectURL(file.originFileObj)
            : file.url;
          return imageUrl ? (
            <Image key={index} src={imageUrl} width={100} height={100} />
          ) : null;
        })}
      </div>
    </>
  );
};

export default ImageUpload;
