import React, { useState } from "react";
import { Modal, Button } from "antd";
import MonacoEditor from "@monaco-editor/react";

type Props = {
  value?: string;
  onChange: (value: string) => void;
  language?: string;
};

const MonacoEditorWithModal: React.FC<Props> = ({
  value = "",
  onChange,
  language = "javascript",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleOk = () => {
    onChange(tempValue);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setTempValue(value); // reset changes
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Mini Monaco editor */}
      <div style={{ height: 120, border: "1px solid #d9d9d9" }}>
        <MonacoEditor
          language={language}
          value={value}
          onChange={(val) => onChange(val ?? "")}
          options={{
            readOnly: true,
            automaticLayout: true,
            autoClosingBrackets: "always",
            formatOnType: true,
            formatOnPaste: true,
            theme: "light",
            tabSize: 2,
          }}
        />
      </div>

      <Button
        type="link"
        style={{ paddingLeft: 0, marginTop: 4 }}
        onClick={() => setIsModalOpen(true)}
      >
        Open Full Editor
      </Button>

      <Modal
        title="Code Editor"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Discard"
        width="80vw"
        style={{ top: 40 }}
        destroyOnClose
      >
        <MonacoEditor
          height="60vh"
          language={language}
          value={tempValue}
          onChange={(val) => setTempValue(val ?? "")}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            autoClosingBrackets: "always",
            formatOnPaste: true,
            formatOnType: true,
            tabSize: 2,
            automaticLayout: true,
          }}
        />
      </Modal>
    </div>
  );
};

export default MonacoEditorWithModal;
