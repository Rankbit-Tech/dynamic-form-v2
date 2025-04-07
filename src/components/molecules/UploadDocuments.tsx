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
import type { UploadProps } from "antd/es/upload/interface";
import axios from "axios";
import { useFormStore } from "@store/useFormStore";
import { useSelectOptions } from "@hooks/useSelectOptions";
import { useFileUpload } from "@hooks/useFileUpload";

import fileTypeImg from "./fileType.png";

interface DocumentType {
  label: string;
  value: string;
}

interface DocumentRecord {
  name: string;
  fileName: string;
  type: string;
  filePath: string;
}

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
    fileNamePrefix?: string;
    previewEndpoint: string;
  };
  options?: { label: string; value: string; isRequired?: boolean }[];
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
  requiredKey?: string;
  valueKey?: string;
  optionSource: "api" | "manual";
  defaultValue?: string;
  requestType?: "GET" | "POST";
  dataPath?: string;
  headers: Record<string, string>[];
}

const UploadDocuments: React.FC<UploadDocumentsProps> = (props) => {
  const { Option } = Select;
  const [selectedType, setSelectedType] = useState<string>("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [currentPreview, setCurrentPreview] = useState("");
  const form = Form.useFormInstance();

  const {
    label,
    name,
    config,
    validations = {},
    deleteEndpoint,
    headers,
  } = props || {};

  useEffect(() => {
    form.setFieldValue("dynamic_temp_field_selectedType", selectedType);
  }, [form]);

  const { setFormValues, formValues } = useFormStore();
  const { options } = useSelectOptions({
    label: props?.label || "",
    name: props?.name,
    defaultValue: props?.defaultValue || "",
    validations: props?.validations || {},
    optionSource: props?.optionSource || "manual",
    options: props?.options || [],
    endpoint: props?.endpoint || "",
    labelKey: props?.labelKey || "label",
    valueKey: props?.valueKey || "value",
    requiredKey: props?.requiredKey || "",
    requestType: props?.requestType || "GET",
    dataPath: props?.dataPath || "",
    headers: headers,
    formValues,
  });

  const { requestHeaders, uploadFile, loading, getSignedURI } = useFileUpload({
    headers,
  });

  const isDocumentUploaded = formValues[name]?.some(
    (file: DocumentRecord) => file.name === selectedType
  );

  const handleTypeChange = (value: string) => {
    form.setFieldsValue({ documentType: value });
    setSelectedType(value);
  };

  const handleUpload = async (file: File) => {
    if (!selectedType) {
      message.error("Please select a document type first");
      return false;
    }

    if (validations.maxSize && file.size > validations.maxSize * 1024 * 1024) {
      message.error(`File must be smaller than ${validations.maxSize}MB`);
      return false;
    }

    const response = await uploadFile({ file, config });
    if (response?.data) {
      const { gcsFileName, mimeType } = response.data;

      setFormValues((values) => {
        const existingValues = Array.isArray(values[name]) ? values[name] : [];

        const newValues = {
          ...values,
          [name]: [
            ...existingValues,
            {
              name: selectedType,
              fileName: file.name,
              filePath: gcsFileName,
              type: mimeType,
            },
          ],
        };

        form.setFieldValue(name, newValues[name]);
        return newValues;
      });
    }
  };

  const handleDownload = async (path: string) => {
    try {
      if (!path) return false;

      const newPath = encodeURIComponent(path);

      const url = await getSignedURI(newPath, config?.previewEndpoint);
      const response = await fetch(url.data);
      const blob = await response.blob();
      const objectURL = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectURL;
      link.download = url.data;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(objectURL);
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  const handlePreview = async (path: string) => {
    if (!path) return false;

    const newPath = encodeURIComponent(path);

    const url = await getSignedURI(newPath, config?.previewEndpoint);
    setCurrentPreview(url.data);
    setPreviewVisible(true);
  };

  const deleteFile = async (path: any) => {
    try {
      if (!deleteEndpoint) {
        message.error("Delete endpoint or deleteKey required");
        return false;
      }

      if (!path) return false;

      const newPath = encodeURIComponent(path);
      const endpoint = `${deleteEndpoint}/${newPath}`;
      const response = await axios.delete(endpoint, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...requestHeaders,
        },
      });

      if (response.status == 200) {
        message.success("File deleted");
        setFormValues((values) => {
          const existingValues = Array.isArray(values[name])
            ? values[name]
            : [];

          const newValues = {
            ...values,
            [name]: existingValues.filter((item) => item.filePath !== path), // Remove item by filePath
          };

          form.setFieldValue(name, newValues[name]);
          return newValues;
        });
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

  const handleDelete = async (path: string) => {
    try {
      await deleteFile(path);
    } catch (error: any) {
      const errorMessage = error.message || `File not deleted`;
      message.error(errorMessage);
    }
  };

  const columns = [
    {
      title: "Document Type",
      dataIndex: "documentType",
      key: "documentType",
      render: (_: any, record: DocumentRecord) => {
        return record.name || "File";
      },
    },
    {
      title: "File Type",
      dataIndex: "fileType",
      key: "fileType",
      render: (_: any, record: DocumentRecord) => {
        if (record?.type.startsWith("image")) {
          return <img src={fileTypeImg} height="50px" width="50px" />;
        }

        return record?.type;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text: string, record: DocumentRecord) => (
        <Space>
          <span>{text}</span>
          <Space>
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => handlePreview(record.filePath)}
              title="View"
            />
            <Button
              type="text"
              icon={<DownloadOutlined />}
              onClick={() => handleDownload(record.filePath)}
              title="Download"
            />
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.filePath)}
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

        return false;
      } catch (error) {
        return false;
      }
    },
    showUploadList: false,
    accept: validations.accept,
    multiple: validations.multiple,
  };

  const validateUpload = () => {
    const requiredOptions = options?.filter((opt) => opt.isRequired);

    for (const option of requiredOptions) {
      const isFileUploaded = formValues[name]?.some(
        (file: DocumentRecord) => file.name === option.value
      );

      if (!isFileUploaded) {
        return Promise.reject(
          new Error(`Please upload the required document for ${option.label}!`)
        );
      }
    }

    return Promise.resolve();
  };

  return (
    <div className="space-y-4">
      <Flex justify="flex-start" align="flex-start" gap={10}>
        <div className="w-1/2">
          <Form.Item
            label={label}
            name="dynamic_temp_field_selectedType"
            required
            rules={[
              {
                required: validations.required,
                message: "This field is required!",
              },
              {
                required: options?.some(
                  (opt) => opt.isRequired && opt.value === selectedType
                ),
                message: "This field is required!",
              },
            ]}
          >
            <Select
              placeholder="Choose an option"
              value={selectedType}
              onChange={handleTypeChange}
            >
              {options?.map((opt) => (
                <Option key={opt.value} value={opt.value}>
                  {opt.isRequired ? (
                    <>
                      <span className="text-red-500">*</span> {opt.label}
                    </>
                  ) : (
                    opt.label
                  )}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div style={{ marginTop: "30px" }}>
          <Form.Item
            name="dynamic_temp_field_upload"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            rules={[{ validator: validateUpload }]}
          >
            <Upload {...uploadProps}>
              <Button
                icon={<UploadOutlined />}
                disabled={!selectedType || loading || isDocumentUploaded}
              >
                {isDocumentUploaded ? "Document Uploaded" : "Upload Document"}
              </Button>
            </Upload>
          </Form.Item>
        </div>
      </Flex>

      {formValues[name]?.length > 0 && (
        <Table
          columns={columns}
          dataSource={formValues[name]}
          rowKey="key"
          pagination={false}
        />
      )}

      <Modal
        open={previewVisible}
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
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UploadDocuments;
