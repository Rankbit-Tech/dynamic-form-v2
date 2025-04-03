import { resolveExpression } from "@utils/index";
import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

interface useFileUploadProps {
  headers: Record<string, any>[];
}

interface uploadFileProps {
  file: File;
  config: Record<string, any>;
}
export const useFileUpload = ({ headers }: useFileUploadProps) => {
  const [loading, setloading] = useState(false);
  const [requestHeaders, setRequestHeaders] = useState<Record<string, any>>({});

  useEffect(() => {
    if (!headers) return;
    setRequestHeaders(
      headers.reduce((acc, header) => {
        acc[resolveExpression(header.key)] = resolveExpression(header.value);
        return acc;
      }, {})
    );
  }, [headers]);

  const uploadFile = async ({ file, config }: uploadFileProps) => {
    const prefix = resolveExpression(config?.fileNamePrefix);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", prefix + file.name);

    try {
      setloading(true);
      const method = config.requestType.toLowerCase() as "post" | "put";
      const response = await axios[method](config.endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...requestHeaders,
        },
      });

      const responseData = response.data;

      return responseData;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        `${file.name} upload failed`;
      message.error(errorMessage);
      return false;
    } finally {
      setloading(false);
    }
  };

  const getSignedURI = async (path: string, endpoint: string) => {
    try {
      setloading(true);
      if (!path) {
        message.error("Path not found");
        return false;
      }

      const resolveEndpoint = resolveExpression(endpoint);

      const response = await axios.get(`${resolveEndpoint}/${path}`, {
        headers: {
          ...requestHeaders,
        },
      });

      if (response.status == 200) {
        return response.data;
      }
      return false;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        `Fetching ${path} failed`;
      message.error(errorMessage);
      return false;
    } finally {
      setloading(false);
    }
  };

  return {
    uploadFile,
    requestHeaders,
    loading,
    setloading,
    getSignedURI,
  };
};
