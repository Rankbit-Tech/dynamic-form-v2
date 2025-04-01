import React, { useEffect, useState } from "react";
import {
  Form,
  Select,
  Upload,
  Table,
  Button,
  message,
  Space,
  Modal,
  Flex,
} from "antd";
import {
  UploadOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import type {
  UploadFile,
  UploadProps,
  UploadFileStatus,
} from "antd/es/upload/interface";
import axios from "axios";
import { useFormStore } from "@store/useFormStore";
import { useSelectOptions } from "@hooks/useSelectOptions";
import { resolveExpression } from "@utils/index";

interface DocumentType {
  label: string;
  value: string;
}

interface DocumentRecord {
  field: string;
  fileName: string;
  path: string;
  url: string;
  name: string;
}

type OptionsType = {
  label: string;
  value: string | number;
};

interface UploadDocumentsProps {
  label?: string;
  name: string;
  documentTypes?: DocumentType[];
  documentTypesApi?: {
    endpoint: string;
    requestType: "GET" | "POST";
    labelKey: string;
    valueKey: string;
    dataKey?: string;
  };
  endpoint?: string;
  config: {
    endpoint: string;
    requestType: "POST" | "PUT";
    fileFieldName: string;
    typeFieldName: string;
    urlKey: string;
    statusKey: string;
  };
  options?: { label: string; value: string }[];
  deleteKey?: string;
  deleteEndpoint?: string;
  validations?: {
    required?: boolean;
    multiple?: boolean;
    maxSize?: number;
    maxCount?: number;
    accept?: string;
  };
  labelKey?: string;
  valueKey?: string;
  optionSource: "api" | "manual";
  defaultValue?: string;
  requestType?: "GET" | "POST";
  dataPath?: string;
  headers?: Record<string, string>[];
}

const UploadDocuments: React.FC<UploadDocumentsProps> = (props) => {
  const [selectedType, setSelectedType] = useState<string>("");
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [uploading, setUploading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [currentPreview, setCurrentPreview] = useState("");
  const form = Form.useFormInstance();

  const {
    label,
    name,
    config,
    validations = {},
    deleteEndpoint,
    deleteKey,
    headers,
  } = props;

  const { setFieldValues, fields } = useFormStore();
  const { options, loading } = useSelectOptions({
    label: props.label || "",
    name: props.name,
    defaultValue: props.defaultValue || "",
    validations: props.validations || {},
    optionSource: props.optionSource || "manual",
    options: props.options || [],
    endpoint: props?.endpoint || "",
    labelKey: props.labelKey || "label",
    valueKey: props.valueKey || "value",
    requestType: props.requestType || "GET",
    dataPath: props.dataPath || "",
  });

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
  };

  useEffect(() => {
    const field = fields.find((field: any) => field.name === name);
    if (field?.values) {
      setDocuments(field.values);
    }
  }, [fields, name]);
  const handleUpload = async (file: File) => {
    if (!selectedType) {
      message.error("Please select a document type first");
      return false;
    }

    if (validations.maxSize && file.size > validations.maxSize * 1024 * 1024) {
      message.error(`File must be smaller than ${validations.maxSize}MB`);
      return false;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", selectedType);

    try {
      setUploading(true);
      const method = config.requestType.toLowerCase() as "post" | "put";
      const response = await axios[method](config.endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(headers?.reduce((acc, header) => ({
            ...acc,
            [header.key]: resolveExpression(header.value),
          })) || {}),
        },
      });

      const responseData = response.data;

      if (!responseData?.files.length) {
        throw new Error("File uploading failed");
      }

      const files = responseData.files.map((file: DocumentRecord) => {
        const option = options?.find(
          (option: OptionsType) => option.value == selectedType
        ) as OptionsType;

        return {
          ...file,
          name: option?.label || selectedType,
        };
      });

      setDocuments((prev) => {
        const newDocuments = [...prev, ...files];
        form.setFieldValue(
          name,
          newDocuments.map((doc) => doc.url)
        );
        setFieldValues(name, newDocuments);
        return newDocuments;
      });

      return responseData;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        `${file.name} upload failed`;
      message.error(errorMessage);
      return false;
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async (file: DocumentRecord) => {
    try {
      const response = await fetch(file.url);
      const blob = await response.blob();
      const objectURL = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = objectURL;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(objectURL);
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  const handlePreview = (url: string) => {
    if (!url) return false;
    setCurrentPreview(url);
    setPreviewVisible(true);
  };

  const deleteFile = async (record: any) => {
    try {
      if (!deleteEndpoint || !deleteKey) {
        message.error("Delete endpoint or deleteKey required");
        return false;
      }
      const endpoint = `${deleteEndpoint}/${record[deleteKey]}`;
      const response = await axios.delete(endpoint, {
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

      if (response.status == 200) {
        message.success("File deleted");
        return true;
      }

      return false;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || `File not deleted`;
      message.error(errorMessage);
      return false;
    }
  };

  const handleDelete = async (record: DocumentRecord) => {
    try {
      const response = await deleteFile(record);
      if (response) {
        setDocuments((prev) => {
          const newDocuments = prev.filter((doc) => doc.url !== record.url);
          form.setFieldValue(
            name,
            newDocuments.map((doc) => doc.url)
          );
          return newDocuments;
        });
      }
    } catch (error: any) {
      const errorMessage = error.message || `File not deleted`;
      message.error(errorMessage);
    }
  };

  const columns = [
    {
      title: "Document Type",
      dataIndex: "type",
      key: "type",
      render: (_: any, record: DocumentRecord) => {
        return record.name || "File";
      },
    },
    {
      title: "File Name",
      dataIndex: "fileName",
      key: "fileName",
      render: (text: string, record: DocumentRecord) => (
        <Space>
          <span>{text}</span>
          <Space>
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => handlePreview(record.url)}
              title="View"
            />
            <Button
              type="text"
              icon={<DownloadOutlined />}
              onClick={() => handleDownload(record)}
              title="Download"
            />
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

  const uploadProps: UploadProps = {
    beforeUpload: async (file) => {
      try {
        const response = await handleUpload(file);
        if (!response) return false;

        const files = response?.files.map((file: any) => {
          return {
            key: file.uid,
            type: selectedType,
            fileName: file.name,
            file: {
              ...file,
              url: response.url,
              status: "done" as UploadFileStatus,
            },
          };
        });

        setFileList(files);

        return false;
      } catch (error) {
        return false;
      }
    },
    fileList,
    showUploadList: false,
    accept: validations.accept,
    multiple: validations.multiple,
  };

  console.log(options);

  return (
    <div className="space-y-4">
      <Form layout="vertical">
        <Flex justify="flex-start" align="flex-start" gap={10}>
          <div className="w-1/2">
            <Form.Item
              label={label}
              initialValue={selectedType}
              required={validations.required}
            >
              <Select
                loading={loading}
                placeholder="Select document type"
                options={options}
                onChange={handleTypeChange}
                value={selectedType}
              />
            </Form.Item>
          </div>

          <div style={{ marginTop: "30px" }}>
            <Form.Item>
              <Upload {...uploadProps}>
                <Button
                  icon={<UploadOutlined />}
                  disabled={!selectedType || uploading}
                >
                  Upload Document
                </Button>
              </Upload>
            </Form.Item>
          </div>
        </Flex>
      </Form>

      <Table
        columns={columns}
        dataSource={documents}
        rowKey="key"
        pagination={false}
      />

      <Modal
        visible={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
        width={1200}
        style={{}}
      >
        {currentPreview && (
          <div
            style={{
              position: "relative",
              width: "100%",
              marginTop: "20px",
              minHeight: "70vh",
            }}
          >
            <iframe
              src={currentPreview}
              style={{ width: "100%", height: "100%", minHeight: "70vh" }}
            ></iframe>
            {/* <Image
              alt="preview"
              style={{ width: "100%" }}
              src={currentPreview}
              preview={false}
            /> */}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UploadDocuments;
