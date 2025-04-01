import React, { useMemo, useState } from "react";
import {
  Form,
  Upload,
  Button,
  UploadFile,
  UploadProps,
  message,
  Image,
  Table,
  Space,
} from "antd";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { resolveExpression } from "@utils/index";
import axios from "axios";
import { useFormStore } from "@store/useFormStore";

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
  headers?: Record<string, string>[];
  config?: {
    endpoint: string;
    onSuccess?: (response: any) => void;
    onError?: (error: any) => void;
  };
}

const ImageUpload: React.FC<FileUploadProps> = ({
  label,
  name,
  validations,
  config,
  headers,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);
  const form = Form.useFormInstance();
  const { required, maxCount, accept, maxSize, multiple } = validations || {};

  const rules = [{ required, message: `Please upload your ${label}` }];
  const { formValues, setFormValues } = useFormStore();

  const imageUrls = useMemo(() => {
    return formValues?.[`${name}_urls`] || [];
  }, [formValues, name]);

  const handleUpload = async (file: File) => {
    if (!config?.endpoint) {
      message.error("Upload endpoint is not configured");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const response = await axios.post(config.endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(headers?.reduce(
            (acc, header) => ({
              ...acc,
              [header.key]: resolveExpression(header.value),
            }),
            {}
          ) || {}),
        },
      });

      message.success(`${file.name} uploaded successfully`);

      return response.data;
    } catch (error) {
      message.error(`${file.name} upload failed`);
      if (config.onError) {
        config.onError(error);
      }
      throw error;
    } finally {
      setUploading(false);
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
        if (response.files) {
          setUploadedFiles((prev) => {
            const newUploadedFiles = [...prev, ...response.files];
            form.setFieldValue(name, newUploadedFiles);
            setFormValues((prev: any) => ({
              ...prev,
              [`${name}_urls`]: newUploadedFiles,
            }));
            return newUploadedFiles;
          });
        }
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

  const handleDelete = (record: any) => {
    const newFileList = fileList.filter((file) => file.uid !== record.uid);
    setFileList(newFileList);
    form.setFieldValue(name, newFileList);
    setFormValues((prev: any) => ({
      ...prev,
      [`${name}_urls`]: newFileList,
    }));
  };

  const columns = [
    {
      title: "Preview",
      dataIndex: "preview",
      key: "preview",
      render: (_: any, record: any) => {
        return <Image src={record.url} width={60} height={60} />;
      },
    },
    {
      title: "File Name",
      dataIndex: "fileName",
      key: "fileName",
      render: (text: string, record: any) => (
        <Space>
          <span>{text}</span>
          <Space>
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record)}
              title="Delete"
            />
          </Space>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Form.Item
        label={label}
        valuePropName="fileList"
        getValueFromEvent={(e) => e?.fileList}
        rules={rules}
      >
        <Upload showUploadList={false} {...props}>
          <Button icon={<UploadOutlined />} loading={uploading}>
            Upload Image
          </Button>
        </Upload>
      </Form.Item>
      <div className="flex flex-col gap-4 mt-4">
        <Table
          columns={columns}
          dataSource={imageUrls}
          rowKey="key"
          pagination={false}
        />
      </div>
    </>
  );
};

export default ImageUpload;
