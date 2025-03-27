import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button, Modal, Form } from "antd";
import { FormItemProps } from "antd/lib/form/FormItem";

const videoConstraints = {
  width: 200,
  height: 200,
  facingMode: "user",
};

interface CaptureProps extends Omit<FormItemProps, "children"> {
  name: string;
}

const Capture: React.FC<CaptureProps> = ({ name, ...formItemProps }) => {
  const webcamRef = useRef<Webcam>(null);
  const [isOpen, setIsOpen] = useState(false);
  const form = Form.useFormInstance();

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      form.setFieldValue(name, imageSrc);
      setIsOpen(false);
    }
  }, [webcamRef, form, name]);

  const retake = () => {
    form.setFieldValue(name, null);
    setIsOpen(true);
  };

  const value = form.getFieldValue(name);

  return (
    <Form.Item name={name} {...formItemProps}>
      <div>
        {value ? (
          <div>
            <img
              src={value}
              alt="Captured"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <Button onClick={retake}>Retake</Button>
          </div>
        ) : (
          <Button onClick={() => setIsOpen(true)}>Open Camera</Button>
        )}

        <Modal
          title="Capture Photo"
          open={isOpen}
          onCancel={() => setIsOpen(false)}
          footer={[
            <Button key="capture" type="primary" onClick={capture}>
              Capture
            </Button>,
            <Button key="cancel" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>,
          ]}
        >
          <div style={{ width: "200px", height: "200px", margin: "0 auto" }}>
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </Modal>
      </div>
    </Form.Item>
  );
};

export default Capture;
