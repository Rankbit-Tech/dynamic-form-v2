import React, { useEffect, useState } from "react";
import {
  Form,
  Upload,
  Button,
  UploadFile,
  UploadProps,
  message,
  Image,
  Progress,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { normalizeFileList } from "@utils/index";
import axios from "axios";

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
  config?: {
    endpoint: string;
    headers?: Record<string, string>;
    onSuccess?: (response: any) => void;
    onError?: (error: any) => void;
  };
}

interface UploadProgress {
  [key: string]: number;
}

const ImageUpload: React.FC<FileUploadProps> = ({
  label,
  name,
  formConfig,
  validations,
  config,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({});
  const [uploading, setUploading] = useState(false);

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

  const handleUpload = async (file: File) => {
    if (!config?.endpoint) {
      message.error("Upload endpoint is not configured");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }));

      const response = await axios.post(config.endpoint, formData, {
        headers: {
          ...config.headers,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 100)
          );
          setUploadProgress((prev) => ({ ...prev, [file.name]: progress }));
        },
      });

      setUploadProgress((prev) => ({ ...prev, [file.name]: 100 }));
      message.success(`${file.name} uploaded successfully`);

      if (config.onSuccess) {
        config.onSuccess(response.data);
      }

      return response.data;
    } catch (error) {
      message.error(`${file.name} upload failed`);
      if (config.onError) {
        config.onError(error);
      }
      throw error;
    } finally {
      setUploading(false);
      setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }));
    }
  };

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: async (file) => {
      const isFileSizeValid =
        (maxSize && file.size <= maxSize * 1024 * 1024) || true;

      if (maxSize && !isFileSizeValid) {
        message.error(`File must be smaller or equal to ${maxSize}MB!`);
        return Upload.LIST_IGNORE;
      }

      try {
        const response = await handleUpload(file);
        const newFile: UploadFile = {
          ...file,
          url: response.url || response.fileUrl,
          status: "done" as const,
        };
        setFileList((prevFileList) => [...prevFileList, newFile]);
        return false;
      } catch (error) {
        return Upload.LIST_IGNORE;
      }
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
          <Button icon={<UploadOutlined />} loading={uploading}>
            Upload Image
          </Button>
        </Upload>
      </Form.Item>
      <div className="flex flex-col gap-4 mt-4">
        {fileList?.map((file, index) => {
          const imageUrl = file.originFileObj
            ? URL.createObjectURL(file.originFileObj)
            : file.url;
          return (
            <div key={index} className="flex items-center gap-4">
              {imageUrl && <Image src={imageUrl} width={100} height={100} />}
              {uploadProgress[file.name] > 0 &&
                uploadProgress[file.name] < 100 && (
                  <Progress
                    percent={uploadProgress[file.name]}
                    size="small"
                    className="w-32"
                  />
                )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ImageUpload;
