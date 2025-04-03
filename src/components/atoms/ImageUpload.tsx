import React, { useState } from "react";
import {
  Form,
  Upload,
  Button,
  UploadProps,
  message,
  Table,
  Space,
  Modal,
} from "antd";
import {
  DeleteOutlined,
  DownloadOutlined,
  EyeOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useFormStore } from "@store/useFormStore";
import { useFileUpload } from "@hooks/useFileUpload";

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
  headers: Record<string, string>[];
  config: {
    endpoint: string;
    previewEndpoint: string;
  };
  deleteEndpoint?: string;
}

interface DocumentRecord {
  name: string;
  fileName: string;
  type: string;
  filePath: string;
}

const ImageUpload: React.FC<FileUploadProps> = ({
  label,
  name,
  validations,
  config,
  headers,
  deleteEndpoint,
}) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [currentPreview, setCurrentPreview] = useState("");
  const form = Form.useFormInstance();
  const { required, maxCount, accept, maxSize, multiple } = validations || {};

  const rules = [{ required, message: `Please upload your ${label}` }];
  const { formValues, setFormValues } = useFormStore();

  const { uploadFile, requestHeaders, loading, getSignedURI } = useFileUpload({
    headers,
  });

  const handleUpload = async (file: File) => {
    if (!config?.endpoint) {
      message.error("Upload endpoint is not configured");
      return;
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
              name,
              fileName: file.name,
              filePath: gcsFileName,
              type: mimeType,
            },
          ],
        };

        form.setFieldValue(name, newValues[name]);
        return newValues;
      });

      return true;
    }
  };
  const deleteFile = async (path: any) => {
    try {
      if (!deleteEndpoint) {
        message.error("Delete endpoint required");
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

  const handleDownload = async (path: string) => {
    try {
      if (!path) return false;

      const newPath = encodeURIComponent(path);

      const url = await getSignedURI(newPath, config.previewEndpoint);
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
    console.log(url, "url");
    setCurrentPreview(url.data);
    setPreviewVisible(true);
  };
  const props: UploadProps = {
    beforeUpload: async (file) => {
      const isFileSizeValid =
        (maxSize && file.size <= maxSize * 1024 * 1024) || true;

      if (maxSize && !isFileSizeValid) {
        message.error(`File must be smaller or equal to ${maxSize}MB!`);
        return Upload.LIST_IGNORE;
      }

      try {
        const status = await handleUpload(file);
        if (status) {
          message.success("File uploaded successfully");
        }
        return false;
      } catch (error) {
        message.error("File uploading failed");

        return Upload.LIST_IGNORE;
      }
    },
    maxCount: multiple ? maxCount : 1,
    accept,
    multiple,
  };

  const columns = [
    {
      title: "File Name",
      dataIndex: "documentType",
      key: "documentType",
      render: (_: any, record: DocumentRecord) => {
        return record.fileName || "File";
      },
    },
    {
      title: "File Type",
      dataIndex: "fileType",
      key: "fileType",
      render: (_: any, record: DocumentRecord) => {
        if (record?.type.startsWith("image")) {
          return (
            <img
              src="data:image/png;base64,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rr48713IhwAASNR4YTxamhv/5pbNV306712YfgIAIGHjhfFobmn6q5s3XX1V3rswvQQAQOJ++ZmAz9+08crP5r0L00cAABDFYiFa25v/5JaHrv6LvHdheggAACIiolAoRHPb7j++aeOVn8t7F7InAAD4lUKhEK3tzVffvOnTn897F7IlAAB4iUKhEM2tjVfd/NAVX8h7F7IjAAB4hWKhGE2tzVfe9OAV/5D3LmRDAADw6orFaG5v/vjND17xf/JehdITAAC8tmIxmtqbf/+mjVd+Ke9VKC0BAMDrKxajua3pY1998Iov570KpSMAAHhjxWK0tjX/5xseuPxrea9CaQgAACaoGG3tLR+88YFP3Z73JkydAADgIBSjpb31t2988Io78t6EqREAABykYrS0NV96w/2XfzPvTZg8AQDAJBSjraPlfTfc96lv570JkyMAAJikYrR1tlzylXs/9aO8N+HgCQAApqS9q+XC6+//o5/kvQcHRwAAMGUdHa0XfOW+y+7Mew8mTgAAUBLtnW3v+Mr9l92V9x5MjAAAoGTaO9p+7cv3fuL+vPfgjQkAAEqqs6vjnOvv++QDee/B6xMAAJRcR2f7m66/9xMb896D1yYAAMhER1fHWV++5xOb8t6DVycAAMhMZ3fHGV/6xR8+USxe6/lmhvEDASBTPXs6j7/unp7HRMDM4ocBQOa6ezqPv+6enifuuuva6rx34XkCAIBp0d3TuWFbddfjImBmEAAATJuenu7126q6vRIwAwgAAKZVz56udU9XdT17w85r6/LeJWUCAIBp17un+6iRxq5nREB+BAAAudjT233kSGPnNhGQDwEAQG729PYcMbK7c/u/brp2bt67pEYAAJCrPXt7Gpr3d2wTAdPLpzCBsnDI4iVxwvqT8l6DyTu8rq7ubyPi9/NeJBUCACgL8+bNj3nz5ue9Bswa3gIAgAQJAABIkAAAgAQJAABIkAAAgAQJAABIkAAAgAQJAABIkAAAgAQJAABIkAAAgAQJAABIkAAAgAQJAABIkAAAgAQJAABIkAAAgAQJAABIkAAAgAQJAABIkAAAgAQJAABIkAAAgAQJAABIkAAAgAQJAABIkAAAgAQJAABIkAAAgAQJAABIkAAAgAQJAABIkAAAgAQJAABIkAAAgAQJAABIkAAAgAQJAABIkAAAgAQJAABIkAAAgAQJAABI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"
              height="50px"
              width="50px"
            />
          );
        } else {
          return (
            <img
              height="50px"
              width="50px"
              src="https://images.freeimages.com/fic/images/icons/2813/flat_jewels/512/file.png?fmt=webp&h=350"
            />
          );
        }
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

  const handleDelete = async (path: string) => {
    try {
      await deleteFile(path);
    } catch (error: any) {
      const errorMessage = error.message || `File not deleted`;
      message.error(errorMessage);
    }
  };
  return (
    <>
      <Form.Item
        label={label}
        valuePropName="fileList"
        getValueFromEvent={(e) => e?.fileList}
        rules={rules}
      >
        <Upload showUploadList={false} {...props}>
          <Button icon={<UploadOutlined />} loading={loading}>
            Upload Image
          </Button>
        </Upload>
      </Form.Item>
      <div className="flex flex-col gap-4 mt-4">
        {formValues[name]?.length > 0 && (
          <Table
            columns={columns}
            dataSource={formValues[name]}
            rowKey="key"
            pagination={false}
          />
        )}
      </div>
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
    </>
  );
};

export default ImageUpload;
